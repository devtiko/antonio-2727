import { describe, expect, test } from "vitest";
import { formatMoney } from "../index";

describe("formatMoney", () => {
	test("agrega separador de miles y dos decimales", () => {
		expect(formatMoney(1000)).toBe("1,000.00");
	});

	test("formatea el valor cero", () => {
		expect(formatMoney(0)).toBe("0.00");
	});

	test("completa un solo decimal con un segundo cero", () => {
		expect(formatMoney(1234.5)).toBe("1,234.50");
	});

	test("redondea al usar más de dos decimales", () => {
		expect(formatMoney(9999.999)).toBe("10,000.00");
	});
});
