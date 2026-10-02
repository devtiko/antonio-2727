import type { User } from "@/common/types";

export interface LoginInput {
	email: string;
	password: string;
	remember: boolean;
}

export type RegisterInput = Pick<
	User,
	"first_name" | "last_name" | "email"
> & {
	password: string;
	confirm_password: string;
	accepted_terms: boolean;
};
