import { describe, expect, test } from "vitest";
import * as v from "valibot";
import { topUpSchema } from "../index";
import type { BaseIssue } from "valibot";

const messages = (
	result: {
		readonly issues?: readonly BaseIssue<unknown>[] | undefined;
	},
): string[] => result.issues?.map((issue) => issue.message) ?? [];

const validTopUp = {
	amount: 100,
	card_number: "4509950994509816",
	expiration_date: "12/28",
	cvv: "123",
	user_name: "John Doe",
};

describe("topUpSchema", () => {
	test("acepta una tarjeta válida con todos los campos", () => {
		const result = v.safeParse(topUpSchema, validTopUp);

		expect(result.success).toBe(true);
	});

	test("acepta el número de tarjeta con espacios (formato agrupado)", () => {
		const result = v.safeParse(topUpSchema, {
			...validTopUp,
			card_number: "4509 9509 9450 9816",
		});

		expect(result.success).toBe(true);
	});

	test("acepta el monto mínimo ($25) y el máximo ($5000)", () => {
		const min = v.safeParse(topUpSchema, { ...validTopUp, amount: 25 });
		const max = v.safeParse(topUpSchema, { ...validTopUp, amount: 5000 });

		expect(min.success).toBe(true);
		expect(max.success).toBe(true);
	});

	test("rechaza un monto menor al mínimo", () => {
		const result = v.safeParse(topUpSchema, { ...validTopUp, amount: 20 });

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("El monto mínimo es $25 MXN");
	});

	test("rechaza un monto mayor al máximo", () => {
		const result = v.safeParse(topUpSchema, {
			...validTopUp,
			amount: 6000,
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("El monto máximo es $5000 MXN");
	});

	test("rechaza un número de tarjeta incompleto", () => {
		const result = v.safeParse(topUpSchema, {
			...validTopUp,
			card_number: "450995",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Número de tarjeta incompleto");
	});

	test("rechaza una fecha de expiración fuera del formato MM/AA", () => {
		const cases = ["13/28", "00/28", "1228", "12-28"];

		for (const expiration_date of cases) {
			const result = v.safeParse(topUpSchema, {
				...validTopUp,
				expiration_date,
			});

			expect(result.success).toBe(false);
			expect(messages(result)).toContain("Fecha no válida (MM/AA)");
		}
	});

	test("rechaza un cvv con menos de 3 dígitos", () => {
		const result = v.safeParse(topUpSchema, { ...validTopUp, cvv: "12" });

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("CVV incompleto");
	});

	test("rechaza un cvv con más de 4 dígitos", () => {
		const result = v.safeParse(topUpSchema, {
			...validTopUp,
			cvv: "12345",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("CVV no válido");
	});

	test("rechaza un nombre de usuario vacío (solo espacios)", () => {
		const result = v.safeParse(topUpSchema, {
			...validTopUp,
			user_name: "   ",
		});

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("Campo requerido");
	});
});
