import { HTTP_STATUS_CODE } from "@common/constants";
import { HttpException } from "./http-exception";
import type { HttpErrorArgs } from "./types";

export class PaymentRequiredError extends HttpException {
	constructor(args: HttpErrorArgs) {
		super(HTTP_STATUS_CODE.PAYMENT_REQUIRED, args);
	}
}
