import { describe, expect, test } from "vitest";
import { fromBase64, toBase64 } from "../index";

describe("toBase64", () => {
	test("codifica una cadena ASCII a base64", () => {
		const data = new TextEncoder().encode("Hola");
		expect(toBase64(data)).toBe("SG9sYQ==");
	});

	test("convierte un Uint8Array vacío en cadena vacía", () => {
		expect(toBase64(new Uint8Array())).toBe("");
	});
});

describe("fromBase64", () => {
	test("decodifica base64 a ArrayBuffer", () => {
		const buffer = fromBase64("SG9sYQ==");
		expect(new TextDecoder().decode(buffer)).toBe("Hola");
	});

	test("decodifica una cadena vacía en un buffer vacío", () => {
		expect(new Uint8Array(fromBase64(""))).toHaveLength(0);
	});
});

describe("roundtrip toBase64/fromBase64", () => {
	test("recupera los datos originales con bytes arbitrarios", () => {
		const data = new Uint8Array([0, 1, 2, 253, 254, 255, 65]);

		const decoded = new Uint8Array(fromBase64(toBase64(data)));

		expect(decoded).toEqual(data);
	});

	test("recupera una cadena de texto original", () => {
		const text = "Apuesta $100.00 MXN 🐌";
		const encoded = toBase64(new TextEncoder().encode(text));

		expect(new TextDecoder().decode(fromBase64(encoded))).toBe(text);
	});
});
