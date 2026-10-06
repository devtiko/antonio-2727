import * as v from "valibot";
import type { TopUpInput } from "@/services/api/types";

export type TopUpSchema = Omit<TopUpInput, "user_id" | "user_email">;

export const topUpSchema = v.object({
	amount: v.pipe(
		v.number("Valor no válido"),
		v.minValue(25, "El monto mínimo es $25 MXN"),
		v.maxValue(5000, "El monto máximo es $5000 MXN"),
	),
	card_number: v.pipe(
		v.string("Valor no válido"),
		v.nonEmpty("Campo requerido"),
		v.minLength(15, "Número de tarjeta incompleto"),
	),
	expiration_date: v.pipe(
		v.string("Valor no válido"),
		v.nonEmpty("Campo requerido"),
		v.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Fecha no válida (MM/AA)"),
	),
	cvv: v.pipe(
		v.string("Valor no válido"),
		v.nonEmpty("Campo requerido"),
		v.minLength(3, "CVV incompleto"),
		v.maxLength(4, "CVV no válido"),
	),
	user_name: v.pipe(
		v.string("Valor no válido"),
		v.trim(),
		v.nonEmpty("Campo requerido"),
	),
}) satisfies v.GenericSchema<TopUpSchema>;
