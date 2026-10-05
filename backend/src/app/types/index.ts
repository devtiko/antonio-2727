export interface Card {
	id: number;
	card_number: string;
	expiration_month: number;
	expiration_year: number;
	cvv: string;
}

export enum TransactionStatus {
	REJECTED = "rejected",
	APPROVED = "approved",
}

export interface Transaction {
	id: string;
	status: TransactionStatus;
	status_detail: string;
	transaction_amount: number;
	date_created: string;
	authorization_code: string | null;
	reference: string;
	payer_id: string;
	payer_email: string;
}

export interface TransactionInsert extends Omit<
	Transaction,
	"id" | "date_created" | "reference" | "authorization_code"
> {}

export interface Database {
	cards: Card[];
	transactions: Transaction[];
}
