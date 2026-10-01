import bcrypt from "bcryptjs";
import { Storage } from "@/common/lib";
import { ONE_DAY_MS } from "@/common/constants";
import type { User, Session } from "@/common/types";
import type { LoginInput, RegisterInput } from "./types/requests";

export class ApiService {
	static async login(body: LoginInput) {
		const users = Storage.get<Record<string, User>>("users");
		const userByEmail = users?.[body?.email];

		if (!userByEmail) {
			throw new Error("Credenciales inválidas");
		}

		const pwdValid = userByEmail?.password
			? await bcrypt.compare(body?.password, userByEmail.password)
			: false;

		if (!pwdValid) {
			throw new Error("Credenciales inválidas");
		}

		const newSession: Session = {
			id: crypto.randomUUID(),
			user_id: userByEmail?.id,
			created_at: new Date().toISOString(),
			expires_at: Date.now() + ONE_DAY_MS,
		};

		Storage.set("session", newSession);

		return {
			user: userByEmail,
			session: newSession,
		};
	}

	static me(): User {
		const session = Storage.get<Session>("session");

		if (!session) {
			throw new Error("No autenticado");
		}

		const hasExpired = session.expires_at < Date.now();

		if (hasExpired) {
			Storage.remove("session");
			throw new Error("Sesión expirada");
		}

		const users = Storage.get<Record<string, User>>("users");
		const userById = users?.[session?.user_id];

		if (!users || !userById) {
			throw new Error("Usuario no encontrado");
		}

		return userById;
	}

	static async register(body: RegisterInput): Promise<User> {
		const { confirm_password, password, ...data } = body;

		if (confirm_password !== password) {
			throw new Error("Las contraseñas no coinciden");
		}

		const usersEmailKey =
			Storage.get<Record<string, string>>("users_email_key");
		const existsByEmail = !!usersEmailKey?.[body?.email];

		if (existsByEmail) {
			throw new Error("Correo ya registrado");
		}

		const userId = crypto.randomUUID();
		const salt = await bcrypt.genSalt();
		const pwd = await bcrypt.hash(password, salt);

		const newUser = {
			...data,
			id: userId,
			email: body.email,
		};

		const newSession = {
			id: crypto.randomUUID(),
			user_id: userId,
			created_at: new Date().toISOString(),
			expires_at: Date.now() + ONE_DAY_MS,
		};

		const users = Storage.get<Record<string, User>>("users");

		Storage.set("users", { ...users, [userId]: { ...newUser, password: pwd } });
		Storage.set("users_email_key", { ...usersEmailKey, [body?.email]: userId });
		Storage.set("session", newSession);

		return newUser;
	}
}
