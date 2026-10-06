import { describe, expect, test } from "vitest";
import * as v from "valibot";
import { loginSchema, registerSchema } from "../index";
import type { BaseIssue } from "valibot";

const messages = (
	result: {
		readonly issues?: readonly BaseIssue<unknown>[] | undefined;
	},
): string[] => result.issues?.map((issue) => issue.message) ?? [];

const validLogin = {
	email: "juan@doe.com",
	password: "Secreta123",
	remember: false,
};

const validRegister = {
	first_name: "Juan",
	last_name: "Pérez",
	email: "juan@doe.com",
	password: "Secreta123!",
	confirm_password: "Secreta123!",
	accepted_terms: true,
};

describe("loginSchema", () => {
	test("acepta credenciales válidas", () => {
		const result = v.safeParse(loginSchema, validLogin);

		expect(result.success).toBe(true);
	});

	test("rechaza un correo electrónico vacío", () => {
		const result = v.safeParse(loginSchema, {
			...validLogin,
			email: "",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Campo requerido");
	});

	test("rechaza un correo electrónico con formato no válido", () => {
		const result = v.safeParse(loginSchema, {
			...validLogin,
			email: "juan",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Correo electrónico no válido");
	});

	test("rechaza una contraseña vacía", () => {
		const result = v.safeParse(loginSchema, {
			...validLogin,
			password: "",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Campo requerido");
	});

	test("rechaza una contraseña con menos de 8 caracteres", () => {
		const result = v.safeParse(loginSchema, {
			...validLogin,
			password: "1234567",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain(
			"La contraseña debe tener al menos 8 caracteres",
		);
	});

	test("limpia los espacios en la contraseña antes de validarla", () => {
		const result = v.parse(loginSchema, {
			...validLogin,
			password: "  Secreta123  ",
		});

		expect(result.password).toBe("Secreta123");
	});
});

describe("registerSchema", () => {
	test("acepta un registro válido", () => {
		const result = v.safeParse(registerSchema, validRegister);

		expect(result.success).toBe(true);
	});

	test("acepta un registro sin apellido (campo opcional)", () => {
		const { last_name, ...withoutLastName } = validRegister;
		expect(last_name).toBe("Pérez");

		const result = v.safeParse(registerSchema, withoutLastName);

		expect(result.success).toBe(true);
	});

	test("rechaza un nombre con números o símbolos", () => {
		const result = v.safeParse(registerSchema, {
			...validRegister,
			first_name: "Juan123",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Nombre no válido");
	});

	test("rechaza un nombre vacío", () => {
		const result = v.safeParse(registerSchema, {
			...validRegister,
			first_name: "",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Campo requerido");
	});

	test("rechaza un correo electrónico no válido", () => {
		const result = v.safeParse(registerSchema, {
			...validRegister,
			email: "juan",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Correo electrónico no válido");
	});

	test("rechaza una contraseña que no cumple el patrón", () => {
		const result = v.safeParse(registerSchema, {
			...validRegister,
			password: "abc",
			confirm_password: "abc",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain(
			"La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
		);
	});

	test("rechaza cuando la contraseña y la confirmación no coinciden", () => {
		const result = v.safeParse(registerSchema, {
			...validRegister,
			confirm_password: "Otra456!",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Las contraseñas no coinciden");
	});

	test("rechaza cuando no se aceptan los términos y condiciones", () => {
		const result = v.safeParse(registerSchema, {
			...validRegister,
			accepted_terms: false,
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain(
			"Debes aceptar los términos y condiciones",
		);
	});
});
