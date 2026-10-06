import { describe, expect, test } from "vitest";
import { REGEX } from "../index";

describe("REGEX", () => {
	test.each(["4509950994509816", "4111111111111111111", "1"])(
		"CARD_NUMBER acepta solo dígitos: %s",
		(value) => {
			expect(REGEX.CARD_NUMBER.test(value)).toBe(true);
		},
	);

	test.each(["4509 9509", "4abc", "", "4509-9509"])(
		"CARD_NUMBER rechaza valores que no son solo dígitos: %s",
		(value) => {
			expect(REGEX.CARD_NUMBER.test(value)).toBe(false);
		},
	);

	test.each(["12/28", "01/30", "09/99"])(
		"CARD_EXPIRATION_DATE acepta el formato MM/YY: %s",
		(value) => {
			expect(REGEX.CARD_EXPIRATION_DATE.test(value)).toBe(true);
		},
	);

	test.each(["13/28", "00/28", "1/28", "12/2028", "1228", "ab/cd"])(
		"CARD_EXPIRATION_DATE rechaza formatos que no son MM/YY: %s",
		(value) => {
			expect(REGEX.CARD_EXPIRATION_DATE.test(value)).toBe(false);
		},
	);

	test.each(["123", "1234"])(
		"CARD_CVV acepta 3 o 4 dígitos: %s",
		(value) => {
			expect(REGEX.CARD_CVV.test(value)).toBe(true);
		},
	);

	test.each(["12", "12345", "12a", ""])(
		"CARD_CVV rechaza valores fuera de 3-4 dígitos: %s",
		(value) => {
			expect(REGEX.CARD_CVV.test(value)).toBe(false);
		},
	);

	test.each(["John Doe", "José", "Ñandú"])(
		"NAME acepta letras y espacios: %s",
		(value) => {
			expect(REGEX.NAME.test(value)).toBe(true);
		},
	);

	test.each(["John123", "John_Doe", "John@Doe", ""])(
		"NAME rechaza números, símbolos o vacío: %s",
		(value) => {
			expect(REGEX.NAME.test(value)).toBe(false);
		},
	);
});
