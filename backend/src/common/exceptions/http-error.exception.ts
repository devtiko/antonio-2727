import { HTTP_STATUS_CODE } from "@common/constants";
import { HttpException } from "./http-exception";
import type { HttpExceptionArgs } from "./types";

export class PaymentRequiredException<T = unknown> extends HttpException<T> {
	constructor(args: HttpExceptionArgs<T>) {
		super(HTTP_STATUS_CODE.PAYMENT_REQUIRED, args);
	}
}
