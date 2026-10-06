import { describe, expect, test } from "vitest";
import { generateRandomHex } from "../index";

describe("generateRandomHex", () => {
	test("devuelve una cadena con la longitud solicitada", () => {
		expect(generateRandomHex(8)).toHaveLength(8);
		expect(generateRandomHex(16)).toHaveLength(16);
	});

	test("devuelve solo caracteres hexadecimales en minúscula", () => {
		const result = generateRandomHex(20);

		expect(result).toMatch(/^[0-9a-f]+$/);
	});

	test("acepta longitudes impares", () => {
		expect(generateRandomHex(7)).toHaveLength(7);
	});

	test("con longitud 0 devuelve una cadena vacía", () => {
		expect(generateRandomHex(0)).toBe("");
	});

	test("genera valores distintos en cada llamada", () => {
		const first = generateRandomHex(8);
		const second = generateRandomHex(8);

		expect(first).not.toBe(second);
	});
});
