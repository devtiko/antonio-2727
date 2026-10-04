import * as v from "valibot";

export interface RaceTicketForm {
	amount: number;
}

export const raceTicketSchema = v.object({
	amount: v.pipe(
		v.number("Valor no válido"),
		v.minValue(10, "El monto mínimo es $10 MXN"),
		v.maxValue(1000, "El monto máximo es $1000 MXN"),
	),
});
