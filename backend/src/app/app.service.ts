import { APPROVED_CARD } from "./mock";
import { MESSAGE_CODE } from "@common/constants";
import { PaymentRequiredError } from "@common/exceptions";
import type { TopUpDto } from "./dto";

export class AppService {
	topUp = (payload: TopUpDto) => {
		const cardNumber = payload.card_number.replace(/\s/g, "");

		const isApproved =
			cardNumber === APPROVED_CARD.card_number &&
			payload.expiration_date === APPROVED_CARD.expiration_date &&
			payload.cvv === APPROVED_CARD.cvv;

		if (!isApproved) {
			throw new PaymentRequiredError({
				code: MESSAGE_CODE.CARD_DECLINED,
				message: "Tarjeta rechazada",
			});
		}

		return {
			full_name: payload.full_name,
			amount: payload.amount,
		};
	};
}
