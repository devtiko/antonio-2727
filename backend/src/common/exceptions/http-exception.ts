import type { HttpExceptionArgs } from "./types";

export class HttpException extends Error {
	public readonly code: string;
	public readonly statusCode: number;
	public readonly details?: string[];

	constructor(statusCode: number, args: HttpExceptionArgs) {
		super(args.message);

		Object.setPrototypeOf(this, new.target.prototype);

		this.code = args.code;
		this.name = "AppError";
		this.statusCode = statusCode;
		this.details = args.details;

		Error.captureStackTrace(this, HttpException);
	}
}
