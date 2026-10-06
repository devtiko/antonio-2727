import type { Card } from "../types";
import type { TopUpDto } from "../dto";
import { getMonth, getYear } from "date-fns";

export function isExpired(
	card: Pick<TopUpDto, "expiration_year" | "expiration_month">,
) {
	const currentDate = new Date();
	const currentYear = getYear(currentDate) % 100;
	const currentMonth = getMonth(currentDate) + 1;
	return (
		card?.expiration_year < currentYear ||
		(card?.expiration_year == currentYear &&
			card?.expiration_month < currentMonth)
	);
}

export function mask(value: string, visible = 0) {
	const hidden = Math.max(value.length - visible, 0);
	return "*".repeat(hidden) + value.slice(value.length - visible);
}

export function verifyPayment(body: TopUpDto, card: Card) {
	return (
		body.expiration_month === card?.expiration_month &&
		body.expiration_year === card?.expiration_year &&
		body.cvv === card?.cvv
	);
}
