import { describe, expect, test } from "vitest";
import { HttpException, PaymentRequiredException } from "../index";

describe("HttpException", () => {
	test("guarda el statusCode, el código y el mensaje", () => {
		const error = new HttpException(422, {
			code: "validation_error",
			message: "Body inválido",
			errors: ["user_id: required"],
		});

		expect(error.statusCode).toBe(422);
		expect(error.code).toBe("validation_error");
		expect(error.message).toBe("Body inválido");
		expect(error.errors).toEqual(["user_id: required"]);
	});

	test("es una instancia de Error y se llama AppError", () => {
		const error = new HttpException(500, {
			code: "internal_error",
			message: "ups",
		});

		expect(error).toBeInstanceOf(Error);
		expect(error.name).toBe("AppError");
	});

	test("permite adjuntar data adicional", () => {
		const error = new HttpException(402, {
			code: "payment_required",
			message: "Pago rechazado",
			data: { id: "tx-1" },
		});

		expect(error.data).toEqual({ id: "tx-1" });
	});

	test("errors y data son opcionales", () => {
		const error = new HttpException(404, {
			code: "not_found",
			message: "no existe",
		});

		expect(error.errors).toBeUndefined();
		expect(error.data).toBeUndefined();
	});
});

describe("PaymentRequiredException", () => {
	test("usa el statusCode 402 automáticamente", () => {
		const error = new PaymentRequiredException({
			code: "payment_required",
			message: "Pago rechazado",
		});

		expect(error.statusCode).toBe(402);
	});

	test("es una instancia de HttpException", () => {
		const error = new PaymentRequiredException({
			code: "payment_required",
			message: "Pago rechazado",
		});

		expect(error).toBeInstanceOf(HttpException);
	});

	test("conserva la data de la transacción rechazada", () => {
		const transaction = { id: "tx-1", status: "rejected" };
		const error = new PaymentRequiredException({
			code: "payment_required",
			message: "Pago rechazado",
			data: transaction,
		});

		expect(error.data).toEqual(transaction);
	});
});
