import type { User } from "@/common/types";

export interface LoginInput {
	email: string;
	password: string;
	remember: boolean;
}

export interface RegisterInput extends Pick<
	User,
	"first_name" | "last_name" | "email"
> {
	password: string;
	confirm_password: string;
	accepted_terms: boolean;
}

export interface TicketInput {
	amount: number;
}

export interface TopUpInput {
	amount: number;
	card_number: string;
	expiration_date: string;
	cvv: string;
	user_name: string;
	user_id: User["id"];
	user_email: User["email"];
}
