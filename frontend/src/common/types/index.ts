export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface User {
	id: UUID;
	first_name: string;
	last_name?: string;
	email: string;
	password?: string;
	created_at: string;
	updated_at: string;
	balance: number;
}

export interface Session {
	id: UUID;
	user_id: UUID;
	created_at: string;
	expires_at: number;
}

export const TransactionStatus = {
	REJECTED: "rejected",
	APPROVED: "approved",
} as const;

export type TransactionStatus =
	(typeof TransactionStatus)[keyof typeof TransactionStatus];

export const TransactionStatusDetail = {
	ACCREDITED_PAYMENT: "accredited_payment",
	EXPIRED_CARD: "expired_card",
	DECLINED_CARD: "declined_card",
	CARD_VERIFICATION_FAILED: "card_verification_failed",
} as const;

export type TransactionStatusDetail =
	(typeof TransactionStatusDetail)[keyof typeof TransactionStatusDetail];

export interface Transaction {
	id: string;
	status: TransactionStatus;
	status_detail: TransactionStatusDetail;
	transaction_amount: number;
	date_created: string;
	authorization_code: string | null;
	reference: string;
	payer_id: UUID;
	payer_email: string;
	card_number: string;
	card_cvv: string;
}
