import type { User, Session } from "@/common/types";

export interface LoginResponse {
	user: User;
	session: Session;
}
