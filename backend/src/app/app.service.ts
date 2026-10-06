import { verifyPayment, isExpired } from "./utils";
import {
	TransactionStatus,
	TransactionStatusDetail,
	type Transaction,
} from "./types";
import type { TopUpDto } from "./dto";
import type { AppRepository } from "./app.repository";
import { PaymentRequiredException } from "@common/exceptions";

export class AppService {
	constructor(private readonly repository: AppRepository) {}

	topUp(body: TopUpDto): Transaction {
		const paymentError = {
			code: "payment_error",
			message: "Payment error",
		};

		const transactionData = {
			transaction_amount: body.amount,
			payer_id: body.user_id,
			payer_email: body.user_email,
			card_number: body.card_number,
			card_cvv: body.cvv,
		};

		if (isExpired(body)) {
			const transaction = this.repository.createTransaction({
				status: TransactionStatus.REJECTED,
				status_detail: TransactionStatusDetail.EXPIRED_CARD,
				...transactionData,
			});

			throw new PaymentRequiredException({
				...paymentError,
				data: transaction,
			});
		}

		const card = this.repository.findOneCard();

		if (!(body?.card_number === card?.card_number)) {
			const transaction = this.repository.createTransaction({
				status: TransactionStatus.REJECTED,
				status_detail: TransactionStatusDetail.DECLINED_CARD,
				...transactionData,
			});

			throw new PaymentRequiredException({
				...paymentError,
				data: transaction,
			});
		}

		if (!verifyPayment(body, card)) {
			const transaction = this.repository.createTransaction({
				status: TransactionStatus.REJECTED,
				status_detail: TransactionStatusDetail.CARD_VERIFICATION_FAILED,
				...transactionData,
			});

			throw new PaymentRequiredException({
				...paymentError,
				data: transaction,
			});
		}

		return this.repository.createTransaction({
			status: TransactionStatus.APPROVED,
			status_detail: TransactionStatusDetail.ACCREDITED_PAYMENT,
			...transactionData,
		});
	}
}
