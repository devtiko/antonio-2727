import { rateLimit } from "express-rate-limit";
import { HTTP_STATUS_CODE } from "@common/constants";

export const rateLimiter = rateLimit({
	limit: 100,
	legacyHeaders: false,
	windowMs: 15 * 60 * 1000,
	standardHeaders: "draft-8",
	handler: (_req, res) =>
		res.status(HTTP_STATUS_CODE.TOO_MANY_REQUESTS).json({
			code: "too_many_requests",
			message: "Too Many Requests",
		}),
});
