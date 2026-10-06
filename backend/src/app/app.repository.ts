import {
	TransactionStatus,
	type Database,
	type Transaction,
	type TransactionInsert,
} from "./types";
import { generateRandomHex } from "@common/functions";
import { mask } from "./utils";

export class AppRepository {
	constructor(private readonly db: Database) {}

	findOneCard() {
		return this.db.cards[0];
	}

	createTransaction(data: TransactionInsert) {
		const isApproved = data?.status == TransactionStatus.APPROVED;
		const newItem: Transaction = {
			...data,
			card_number: mask(data.card_number, 4),
			card_cvv: mask(data.card_cvv),
			id: `txn_${generateRandomHex(12)}`,
			reference: `ref_${generateRandomHex(12)}`,
			date_created: new Date().toISOString(),
			authorization_code: isApproved ? `auth_${generateRandomHex(6)}` : null,
		};
		return newItem;
	}
}
