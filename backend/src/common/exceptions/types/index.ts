export type HttpExceptionArgs = {
	code: string;
	message: string;
	details?: string[];
};

export type HttpErrorArgs = Omit<HttpExceptionArgs, "statusCode">;
