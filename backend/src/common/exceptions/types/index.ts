export type HttpExceptionArgs<TData = unknown> = {
	code: string;
	message: string;
	errors?: string[];
	data?: TData;
};
