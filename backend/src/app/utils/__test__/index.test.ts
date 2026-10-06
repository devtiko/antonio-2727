import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { isExpired, mask, verifyPayment } from "../index";
import type { Card } from "../../types";
import type { TopUpDto } from "../../dto";

const body: TopUpDto = {
	user_id: "1b671a64-40d5-491e-99b0-da01ff1f3341",
	user_email: "john@doe.com",
	card_number: "4509950994509816",
	cvv: "123",
	user_name: "John Doe",
	amount: 1000,
	expiration_month: 5,
	expiration_year: 30,
};

const card: Card = {
	id: 1,
	card_number: "4509950994509816",
	expiration_month: 5,
	expiration_year: 30,
	cvv: "123",
};

describe("mask", () => {
	test("enmascara todos los caracteres por defecto", () => {
		expect(mask("1234")).toBe("****");
	});

	test("deja visibles los últimos n caracteres", () => {
		expect(mask("4509950994509816", 4)).toBe("************9816");
	});

	test("no recorta si se piden más caracteres visibles que su longitud", () => {
		expect(mask("123", 10)).toBe("123");
	});

	test("devuelve una cadena vacía si el valor está vacío", () => {
		expect(mask("")).toBe("");
	});
});

describe("verifyPayment", () => {
	test("aprueba cuando mes, año y cvv coinciden con la tarjeta", () => {
		expect(verifyPayment(body, card)).toBe(true);
	});

	test("rechaza si el mes es distinto", () => {
		expect(verifyPayment({ ...body, expiration_month: 6 }, card)).toBe(false);
	});

	test("rechaza si el año es distinto", () => {
		expect(verifyPayment({ ...body, expiration_year: 31 }, card)).toBe(false);
	});

	test("rechaza si el cvv es distinto", () => {
		expect(verifyPayment({ ...body, cvv: "999" }, card)).toBe(false);
	});
});

describe("isExpired", () => {
	beforeEach(() => {
		vi.setSystemTime(new Date(2026, 4, 15));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test("está expirada si el año es anterior al actual", () => {
		expect(isExpired({ expiration_year: 25, expiration_month: 12 })).toBe(
			true,
		);
	});

	test("está expirada si el mes es anterior al actual en el mismo año", () => {
		expect(isExpired({ expiration_year: 26, expiration_month: 4 })).toBe(true);
	});

	test("no está expirada si expira en el mes actual", () => {
		expect(isExpired({ expiration_year: 26, expiration_month: 5 })).toBe(false);
	});

	test("no está expirada si expira en un mes futuro del mismo año", () => {
		expect(isExpired({ expiration_year: 26, expiration_month: 6 })).toBe(false);
	});

	test("no está expirada si expira en un año futuro", () => {
		expect(isExpired({ expiration_year: 30, expiration_month: 1 })).toBe(false);
	});
});
