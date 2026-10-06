import * as v from "valibot";
import type { RequestHandler } from "express";
import { HTTP_STATUS_CODE, MESSAGE_CODE } from "@common/constants";

export function validate<TSchema extends v.GenericSchema>(
	schema: TSchema,
): RequestHandler {
	return (req, res, next) => {
		const isGet = req.method === "GET";
		const data = isGet ? req.query : req.body;
		const result = v.safeParse(schema, data, {
			message: MESSAGE_CODE.REQUIRED,
			abortPipeEarly: true,
		});

		if (!result.success) {
			return res.status(HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY).json({
				code: "invalid_data",
				message: "Invalid data",
				errors: result.issues.map((issue) => {
					const field = String(issue.path?.at(-1)?.key ?? "root");
					return `${field}:${issue.message}`;
				}),
			});
		}

		if (isGet) {
			Object.defineProperty(req, "query", {
				value: result.output,
				writable: true,
				configurable: true,
				enumerable: true,
			});
		} else {
			req.body = result.output;
		}

		next();
	};
}
