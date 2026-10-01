import type { User } from "@/common/types";

export interface LoginInput {
	email: string;
	password: string;
}

export interface RegisterInput extends User {
	password: string;
	confirm_password: string;
}
