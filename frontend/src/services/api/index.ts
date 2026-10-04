import bcrypt from "bcryptjs";
import { Storage } from "@/common/lib";
import { ONE_DAY_MS } from "@/common/constants";
import type { User, Session, UUID } from "@/common/types";
import type { LoginInput, RegisterInput } from "./types/requests";
import type { LoginResponse } from "./types/responses";

export class ApiService {
	static async login(body: LoginInput): Promise<LoginResponse> {
		const usersEmailKey =
			await Storage.get<Record<string, UUID>>("users_email_key");
		const userByEmail = usersEmailKey?.[body?.email];

		if (!userByEmail) {
			throw new Error("Correo y/o contraseña incorrectos");
		}

		const users = await Storage.get<Record<UUID, User>>("users");
		const userById = users?.[userByEmail];

		if (!userById) {
			throw new Error("Correo y/o contraseña incorrectos");
		}

		const pwdValid = userById?.password
			? await bcrypt.compare(body?.password, userById.password)
			: false;

		if (!pwdValid) {
			throw new Error("Correo y/o contraseña incorrectos");
		}

		const newSession: Session = {
			id: crypto.randomUUID(),
			user_id: userById?.id,
			created_at: new Date().toISOString(),
			expires_at: Date.now() + ONE_DAY_MS,
		};

		await Storage.set<Session>("session", newSession);

		if (userById?.password) {
			delete userById.password;
		}

		return {
			user: userById,
			session: newSession,
		};
	}

	static async me(): Promise<User> {
		const session = await Storage.get<Session>("session");

		if (!session) {
			throw new Error("No autenticado");
		}

		const hasExpired = session?.expires_at < Date.now();

		if (hasExpired) {
			Storage.remove("session");
			throw new Error("Sesión expirada");
		}

		const users = await Storage.get<Record<UUID, User>>("users");
		const userById = users?.[session?.user_id];

		if (!users || !userById) {
			throw new Error("Usuario no encontrado");
		}

		if (userById?.password) {
			delete userById.password;
		}

		return userById;
	}

	static async register(body: RegisterInput): Promise<LoginResponse> {
		const { confirm_password, password, first_name, last_name, email } = body;

		if (confirm_password !== password) {
			throw new Error("Las contraseñas no coinciden");
		}

		const usersEmailKey =
			await Storage.get<Record<string, UUID>>("users_email_key");
		const existsByEmail = !!usersEmailKey?.[email];

		if (existsByEmail) {
			throw new Error("Correo ya registrado");
		}

		const userId = crypto.randomUUID();
		const salt = await bcrypt.genSalt();
		const pwd = await bcrypt.hash(password, salt);

		const now = new Date().toISOString();

		const newUser: User = {
			id: userId,
			first_name,
			last_name,
			email,
			balance: 0,
			created_at: now,
			updated_at: now,
		};

		const newSession = {
			id: crypto.randomUUID(),
			user_id: userId,
			created_at: now,
			expires_at: Date.now() + ONE_DAY_MS,
		};

		const users = await Storage.get<Record<string, User>>("users");

		Storage.set<Record<string, User>>("users", {
			...users,
			[userId]: { ...newUser, password: pwd },
		});

		Storage.set<Record<string, UUID>>("users_email_key", {
			...usersEmailKey,
			[email]: userId,
		});

		Storage.set<Session>("session", newSession);

		return {
			user: newUser,
			session: newSession,
		};
	}

	static logout() {
		Storage.remove("session");
	}
}
