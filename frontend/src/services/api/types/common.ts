export interface ApiErrorMessage<T = unknown> {
	code: string;
	message: string;
	errors?: string[];
	data?: T;
}
