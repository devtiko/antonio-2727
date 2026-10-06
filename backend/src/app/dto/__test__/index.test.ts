import * as v from "valibot";
import { describe, expect, test } from "vitest";
import { topUpDto } from "../index";

const validInput = {
	user_id: "1b671a64-40d5-491e-99b0-da01ff1f3341",
	user_email: "john@doe.com",
	card_number: "4509950994509816",
	expiration_date: "05/30",
	cvv: "123",
	user_name: "John Doe",
	amount: 1000,
};

const parse = (overrides: Partial<typeof validInput>) =>
	v.safeParse(topUpDto, { ...validInput, ...overrides });

describe("topUpDto", () => {
	test("acepta un body válido y separa la fecha en mes y año", () => {
		const output = v.parse(topUpDto, validInput);

		expect(output.expiration_month).toBe(5);
		expect(output.expiration_year).toBe(30);
		expect(output).not.toHaveProperty("expiration_date");
	});

	test("elimina los espacios del card_number", () => {
		const output = v.parse(topUpDto, {
			...validInput,
			card_number: "4509 9509 9450 9816",
		});

		expect(output.card_number).toBe("4509950994509816");
	});

	test.each([
		{ reason: "user_id vacío", overrides: { user_id: "" } },
		{ reason: "user_id que no es un UUID", overrides: { user_id: "not-a-uuid" } },
		{ reason: "user_email vacío", overrides: { user_email: "" } },
		{
			reason: "user_email con formato inválido",
			overrides: { user_email: "john#doe.com" },
		},
		{
			reason: "card_number con letras",
			overrides: { card_number: "4509950994abc" },
		},
		{
			reason: "card_number demasiado corto",
			overrides: { card_number: "450995099450" },
		},
		{
			reason: "card_number demasiado largo",
			overrides: { card_number: "45099509945098161234" },
		},
		{
			reason: "expiration_date con mes inválido",
			overrides: { expiration_date: "13/28" },
		},
		{ reason: "cvv demasiado corto", overrides: { cvv: "12" } },
		{ reason: "user_name con números", overrides: { user_name: "John123" } },
		{ reason: "amount menor que 25", overrides: { amount: 10 } },
		{ reason: "amount mayor que 5000", overrides: { amount: 6000 } },
		{ reason: "amount con decimales", overrides: { amount: 1000.5 } },
	])("rechaza un body con $reason", ({ overrides }) => {
		expect(parse(overrides).success).toBe(false);
	});

	test("informa el código required cuando falta el user_id", () => {
		expect(parse({ user_id: "" }).issues[0]?.message).toBe("required");
	});

	test("informa el código invalid_format cuando el user_id no es un UUID", () => {
		expect(parse({ user_id: "not-a-uuid" }).issues[0]?.message).toBe(
			"invalid_format",
		);
	});

	test("informa el código min_value cuando el amount es muy bajo", () => {
		expect(parse({ amount: 10 }).issues[0]?.message).toBe("min_value:25");
	});

	test("informa el código max_value cuando el amount es muy alto", () => {
		expect(parse({ amount: 6000 }).issues[0]?.message).toBe("max_value:5000");
	});
});
