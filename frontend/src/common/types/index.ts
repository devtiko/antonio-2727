export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface User {
	id: UUID;
	first_name: string;
	last_name?: string;
	email: string;
	password?: string;
	created_at: string;
	updated_at: string;
}

export interface Session {
	id: UUID;
	user_id: UUID;
	created_at: string;
	expires_at: number;
}
