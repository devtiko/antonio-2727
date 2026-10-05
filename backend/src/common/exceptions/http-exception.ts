import type { HttpExceptionArgs } from "./types";

export class HttpException<T = unknown> extends Error {
	public readonly code: string;
	public readonly statusCode: number;
	public readonly errors?: string[];
	public readonly data?: T;

	constructor(statusCode: number, args: HttpExceptionArgs<T>) {
		super(args.message);

		Object.setPrototypeOf(this, new.target.prototype);

		this.code = args.code;
		this.name = "AppError";
		this.statusCode = statusCode;
		this.errors = args.errors;
		this.data = args.data;

		Error.captureStackTrace(this, HttpException);
	}
}
