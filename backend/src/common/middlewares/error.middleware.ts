import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODE } from "@common/constants";
import { HttpException } from "@common/exceptions";

export function errorHandler(
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	if (err instanceof HttpException) {
		return res.status(err.statusCode).json({
			code: err.code,
			message: err.message,
			errors: err?.errors,
			data: err?.data,
		});
	}

	console.error(err);

	return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
		code: "internal_server_error",
		message: "Internal Server Error",
	});
}
