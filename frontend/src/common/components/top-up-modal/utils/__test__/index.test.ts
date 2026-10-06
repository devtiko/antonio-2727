import { describe, expect, test } from "vitest";
import {
	formatCardNumber,
	formatExpiry,
	getStatusMessage,
} from "../index";
import { TransactionStatusDetail, type Transaction } from "@/common/types";

function makeTransaction(
	status_detail: TransactionStatusDetail,
): Transaction {
	return {
		id: "1",
		status: "approved",
		status_detail,
		transaction_amount: 1000,
		date_created: "2026-01-01T00:00:00.000Z",
		authorization_code: null,
		reference: "ref-001",
		payer_id: "00000000-0000-0000-0000-000000000000",
		payer_email: "john@doe.com",
		card_number: "4509 9509 9450 9816",
		card_cvv: "123",
	};
}

describe("getStatusMessage", () => {
	test("ACREDITED_PAYMENT: confirma la recarga con el monto formateado", () => {
		const { title, description } = getStatusMessage(
			makeTransaction(TransactionStatusDetail.ACCREDITED_PAYMENT),
		);

		expect(title).toBe("¡Recarga Exitosa!");
		expect(description).toContain("$1000.00 MXN");
	});

	test("EXPIRED_CARD: pide verificar los datos", () => {
		const { title, description } = getStatusMessage(
			makeTransaction(TransactionStatusDetail.EXPIRED_CARD),
		);

		expect(title).toBe("Tarjeta Vencida");
		expect(description).toContain("intenta de nuevo");
	});

	test("DECLINED_CARD: avisa que el banco rechazó la tarjeta", () => {
		const { title, description } = getStatusMessage(
			makeTransaction(TransactionStatusDetail.DECLINED_CARD),
		);

		expect(title).toBe("Tarjeta Rechazada");
		expect(description).toContain("rechazó la tarjeta");
	});

	test("CARD_VERIFICATION_FAILED: avisa que la verificación falló", () => {
		const { title, description } = getStatusMessage(
			makeTransaction(TransactionStatusDetail.CARD_VERIFICATION_FAILED),
		);

		expect(title).toBe("Verificación Fallida");
		expect(description).toContain("no pudo verificar");
	});

	test("estado desconocido: usa el mensaje genérico de pago rechazado", () => {
		const { title, description } = getStatusMessage({
			...makeTransaction(TransactionStatusDetail.DECLINED_CARD),
			status_detail: "unknown" as TransactionStatusDetail,
		});

		expect(title).toBe("Pago Rechazado");
		expect(description).toContain("No se pudo procesar");
	});
});

describe("formatCardNumber", () => {
	test("agrupa los dígitos en bloques de cuatro", () => {
		expect(formatCardNumber("4509950994509816")).toBe(
			"4509 9509 9450 9816",
		);
	});

	test("elimina los caracteres que no son dígitos", () => {
		expect(formatCardNumber("4509abc9509")).toBe("4509 9509");
	});

	test("mantiene el formato si ya viene agrupado", () => {
		expect(formatCardNumber("4509 9509 9450 9816")).toBe(
			"4509 9509 9450 9816",
		);
	});

	test("trunca a un máximo de 16 dígitos", () => {
		expect(formatCardNumber("45099509945098169999")).toBe(
			"4509 9509 9450 9816",
		);
	});

	test("devuelve una cadena vacía si no hay dígitos", () => {
		expect(formatCardNumber("")).toBe("");
		expect(formatCardNumber("abcd")).toBe("");
	});
});

describe("formatExpiry", () => {
	test("inserta la barra diagonal cuando hay 4 dígitos", () => {
		expect(formatExpiry("1228")).toBe("12/28");
	});

	test("respeta la entrada sin barra ya existente", () => {
		expect(formatExpiry("12/28")).toBe("12/28");
	});

	test("inserta la barra parcialmente con 3 dígitos", () => {
		expect(formatExpiry("122")).toBe("12/2");
	});

	test("no agrega barra con menos de 3 dígitos", () => {
		expect(formatExpiry("12")).toBe("12");
		expect(formatExpiry("1")).toBe("1");
	});

	test("descarta caracteres que no son dígitos", () => {
		expect(formatExpiry("ab1228cd")).toBe("12/28");
	});

	test("devuelve una cadena vacía si no hay dígitos", () => {
		expect(formatExpiry("")).toBe("");
		expect(formatExpiry("abcd")).toBe("");
	});
});
