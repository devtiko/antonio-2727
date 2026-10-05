import type { RequestHandler } from "express";
import { HTTP_STATUS_CODE } from "@common/constants";
import { ENV } from "@config/env";

export const apiKeyGuard: RequestHandler = (req, res, next) => {
	const apiKey = req.headers["x-api-key"];

	if (!ENV.API_KEY || apiKey !== ENV.API_KEY) {
		return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
			code: "unauthorized",
			message: "Unauthorized",
		});
	}

	next();
};
