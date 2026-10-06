import { beforeEach, describe, expect, test } from "vitest";
import { Storage } from "../index";
import type { Session, User } from "@/common/types";

const user: User = {
	id: "1b671a64-40d5-491e-99b0-da01ff1f3341",
	first_name: "John",
	last_name: "Doe",
	email: "john@doe.com",
	created_at: "2026-01-01T00:00:00.000Z",
	updated_at: "2026-01-01T00:00:00.000Z",
	balance: 100,
};

const session: Session = {
	id: "8d5aa7f1-4a48-46de-b603-4de4b7c6b3c2",
	user_id: user.id,
	created_at: "2026-01-01T00:00:00.000Z",
	expires_at: 1798761600000,
};

beforeEach(() => {
	localStorage.clear();
});

describe("Storage.get", () => {
	test("devuelve el objeto guardado", () => {
		Storage.set("user", user);

		expect(Storage.get<User>("user")).toEqual(user);
	});

	test("devuelve null si la clave no existe", () => {
		expect(Storage.get("llave_que_no_existe")).toBeNull();
	});

	test("devuelve null si el valor guardado está vacío", () => {
		localStorage.setItem("vacio", "");

		expect(Storage.get("vacio")).toBeNull();
	});
});

describe("Storage.set", () => {
	test("guarda el valor serializado como JSON", () => {
		Storage.set("session", session);

		expect(localStorage.getItem("session")).toBe(JSON.stringify(session));
	});

	test("sobrescribe el valor de una clave existente", () => {
		Storage.set("balance", 100);
		Storage.set("balance", 500);

		expect(Storage.get<number>("balance")).toBe(500);
	});
});

describe("Storage.remove", () => {
	test("elimina la clave guardada", () => {
		Storage.set("session", session);

		Storage.remove("session");

		expect(Storage.get("session")).toBeNull();
	});
});

describe("Storage.clear", () => {
	test("elimina todas las claves guardadas", () => {
		Storage.set("user", user);
		Storage.set("session", session);

		Storage.clear();

		expect(localStorage.length).toBe(0);
	});
});
