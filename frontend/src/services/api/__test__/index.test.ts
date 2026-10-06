import { beforeEach, describe, expect, test } from "vitest";
import bcrypt from "bcryptjs";
import { ApiService } from "../index";
import { Storage } from "@/common/lib";
import type { Session, Transaction, User } from "@/common/types";

let counter = 0;
if (!globalThis.crypto?.randomUUID) {
	Object.defineProperty(globalThis, "crypto", {
		value: {
			randomUUID: () =>
				[
					(counter += 4).toString(16).padStart(12, "0"),
					"aaaa",
					"bbbb",
					"cccc",
					"dddddddddd00",
				].join("-"),
		},
		configurable: true,
	});
}

const user: User = {
	id: "1b671a64-40d5-491e-99b0-da01ff1f3341",
	first_name: "John",
	last_name: "Doe",
	email: "john@doe.com",
	created_at: "2026-01-01T00:00:00.000Z",
	updated_at: "2026-01-01T00:00:00.000Z",
	balance: 100,
};

const password = "Secreta123";
const passwordHash = bcrypt.hashSync(password, 10);

const transaction: Transaction = {
	id: "txn-001",
	status: "approved",
	status_detail: "accredited_payment",
	transaction_amount: 500,
	date_created: "2026-01-02T00:00:00.000Z",
	authorization_code: null,
	reference: "ref-001",
	payer_id: user.id,
	payer_email: user.email,
	card_number: "450995",
	card_cvv: "123",
};

function seedUser(overrides: Partial<User> = {}): User {
	const seeded = { ...user, password: passwordHash, ...overrides };

	Storage.set("users", { [seeded.id]: seeded });
	Storage.set("users_email_key", { [seeded.email]: seeded.id });

	return seeded;
}

function seedSession(expires_at = Date.now() + 60_000): Session {
	const session: Session = {
		id: "8d5aa7f1-4a48-46de-b603-4de4b7c6b3c2",
		user_id: user.id,
		created_at: "2026-01-01T00:00:00.000Z",
		expires_at,
	};

	Storage.set("session", session);

	return session;
}

beforeEach(() => {
	localStorage.clear();
});

describe("ApiService.login", () => {
	test("devuelve el usuario y crea una sesión cuando las credenciales son correctas", async () => {
		seedUser();

		const response = await ApiService.login({
			email: user.email,
			password,
			remember: false,
		});

		expect(response.user.id).toBe(user.id);
		expect(response.user.password).toBeUndefined();
		expect(response.session.user_id).toBe(user.id);
		expect(Storage.get<Session>("session")?.user_id).toBe(user.id);
	});

	test("falla si el correo no está registrado", async () => {
		await expect(
			ApiService.login({
				email: "desconocido@doe.com",
				password,
				remember: false,
			}),
		).rejects.toThrow("Correo y/o contraseña incorrectos");
	});

	test("falla si la contraseña no coincide", async () => {
		seedUser();

		await expect(
			ApiService.login({
				email: user.email,
				password: "Incorrecta123",
				remember: false,
			}),
		).rejects.toThrow("Correo y/o contraseña incorrectos");
	});
});

describe("ApiService.register", () => {
	test("crea el usuario, lo indexa por correo y abre sesión", async () => {
		const response = await ApiService.register({
			first_name: "Ana",
			last_name: "García",
			email: "ana@doe.com",
			password: "Secreta123!",
			confirm_password: "Secreta123!",
			accepted_terms: true,
		});

		const stored =
			Storage.get<Record<string, User>>("users")?.[response.user.id];

		expect(response.user.email).toBe("ana@doe.com");
		expect(response.user.password).toBeUndefined();
		expect(response.user.balance).toBe(0);
		expect(
			Storage.get<Record<string, string>>("users_email_key")?.["ana@doe.com"],
		).toBe(response.user.id);
		expect(Storage.get<Session>("session")?.user_id).toBe(response.user.id);
		// La contraseña se guarda hasheada, en texto plano no.
		expect(stored?.password).not.toBe("Secreta123!");
		expect(await bcrypt.compare("Secreta123!", stored?.password ?? "")).toBe(
			true,
		);
	});

	test("falla si el correo ya está registrado", async () => {
		seedUser();

		await expect(
			ApiService.register({
				first_name: "John",
				last_name: "Doe",
				email: user.email,
				password: "Secreta123!",
				confirm_password: "Secreta123!",
				accepted_terms: true,
			}),
		).rejects.toThrow("Correo ya registrado");
	});

	test("falla si las contraseñas no coinciden", async () => {
		await expect(
			ApiService.register({
				first_name: "Ana",
				last_name: "García",
				email: "ana@doe.com",
				password: "Secreta123!",
				confirm_password: "Otra456!",
				accepted_terms: true,
			}),
		).rejects.toThrow("Las contraseñas no coinciden");
	});
});

describe("ApiService.me", () => {
	test("devuelve el usuario autenticado con una sesión vigente", () => {
		seedUser();
		seedSession();

		const current = ApiService.me();

		expect(current.id).toBe(user.id);
		expect(current.email).toBe(user.email);
		expect(current.password).toBeUndefined();
	});

	test("elimina la sesión y falla si la sesión expiró", () => {
		seedUser();
		seedSession(Date.now() - 1000);

		expect(() => ApiService.me()).toThrow("Sesión expirada");
		expect(Storage.get("session")).toBeNull();
	});

	test("falla si no hay sesión", () => {
		expect(() => ApiService.me()).toThrow("No autenticado");
	});

	test("falla si la sesión apunta a un usuario que no existe", () => {
		seedSession();

		expect(() => ApiService.me()).toThrow("Usuario no encontrado");
	});
});

describe("ApiService.saveTransaction", () => {
	test("guarda la primera transacción bajo el identificador del usuario", () => {
		ApiService.saveTransaction(transaction);

		expect(
			Storage.get<Record<string, Transaction[]>>("user_transactions")?.[
				user.id
			],
		).toEqual([transaction]);
	});

	test("acumula las transacciones nuevas en la lista del usuario", () => {
		const second: Transaction = { ...transaction, id: "txn-002" };

		ApiService.saveTransaction(transaction);
		ApiService.saveTransaction(second);

		const saved =
			Storage.get<Record<string, Transaction[]>>("user_transactions")?.[
				user.id
			];

		expect(saved).toHaveLength(2);
		expect(saved?.at(-1)).toEqual(second);
	});
});

describe("ApiService.updateUser", () => {
	test("mezcla los cambios con los datos existentes", () => {
		seedUser();

		ApiService.updateUser(user.id, { balance: 500 });

		const stored = Storage.get<Record<string, User>>("users")?.[user.id];

		expect(stored?.balance).toBe(500);
		expect(stored?.first_name).toBe("John");
	});

	test("no crea el usuario si el identificador no existe", () => {
		const otherId = "22222222-2222-2222-2222-222222222222";

		ApiService.updateUser(otherId, { balance: 500 });

		expect(
			Storage.get<Record<string, User>>("users")?.[otherId],
		).toBeUndefined();
	});
});

describe("ApiService.logout", () => {
	test("elimina la sesión guardada", () => {
		seedSession();

		ApiService.logout();

		expect(Storage.get("session")).toBeNull();
	});
});
