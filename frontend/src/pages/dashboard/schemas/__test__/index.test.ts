import { describe, expect, test } from "vitest";
import * as v from "valibot";
import { raceTicketSchema } from "../index";
import type { BaseIssue } from "valibot";

const messages = (
	result: {
		readonly issues?: readonly BaseIssue<unknown>[] | undefined;
	},
): string[] => result.issues?.map((issue) => issue.message) ?? [];

describe("raceTicketSchema", () => {
	test("acepta el monto mínimo ($10)", () => {
		const result = v.safeParse(raceTicketSchema, { amount: 10 });

		expect(result.success).toBe(true);
	});

	test("acepta el monto máximo ($1000)", () => {
		const result = v.safeParse(raceTicketSchema, { amount: 1000 });

		expect(result.success).toBe(true);
	});

	test("acepta un monto dentro del rango", () => {
		const result = v.safeParse(raceTicketSchema, { amount: 500 });

		expect(result.success).toBe(true);
	});

	test("rechaza un monto menor al mínimo", () => {
		const result = v.safeParse(raceTicketSchema, { amount: 5 });

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("El monto mínimo es $10 MXN");
	});

	test("rechaza un monto mayor al máximo", () => {
		const result = v.safeParse(raceTicketSchema, { amount: 2000 });

		expect(result.success).toBe(false);
		expect(messages(result)).toContain("El monto máximo es $1000 MXN");
	});
});
