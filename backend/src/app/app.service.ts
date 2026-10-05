import { verifyPayment, isExpired } from "./utils";
import { TransactionStatus, type Transaction } from "./types";
import type { TopUpDto } from "./dto";
import type { AppRepository } from "./app.repository";
import { PaymentRequiredException } from "@common/exceptions";

export class AppService {
	constructor(private readonly repository: AppRepository) {}

	topUp(body: TopUpDto): Transaction {
		if (isExpired(body)) {
			const transaction = this.repository.createTransaction({
				status: TransactionStatus.REJECTED,
				status_detail: "expired_card",
				transaction_amount: body.amount,
				payer_id: body.user_id,
				payer_email: body.user_email,
			});

			throw new PaymentRequiredException({
				code: "payment_error",
				message: "Payment error",
				data: transaction,
			});
		}

		const card = this.repository.findOneCard();

		if (!(body?.card_number === card?.card_number)) {
			const transaction = this.repository.createTransaction({
				status: TransactionStatus.REJECTED,
				status_detail: "declined_card",
				transaction_amount: body.amount,
				payer_id: body.user_id,
				payer_email: body.user_email,
			});

			throw new PaymentRequiredException({
				code: "payment_error",
				message: "Payment error",
				data: transaction,
			});
		}

		if (!verifyPayment(body, card)) {
			const transaction = this.repository.createTransaction({
				status: TransactionStatus.REJECTED,
				status_detail: "card_verification_failed",
				transaction_amount: body.amount,
				payer_id: body.user_id,
				payer_email: body.user_email,
			});

			throw new PaymentRequiredException({
				code: "payment_error",
				message: "Payment error",
				data: transaction,
			});
		}

		return this.repository.createTransaction({
			status: TransactionStatus.APPROVED,
			status_detail: "accredited_payment",
			transaction_amount: body.amount,
			payer_id: body.user_id,
			payer_email: body.user_email,
		});
	}
}
