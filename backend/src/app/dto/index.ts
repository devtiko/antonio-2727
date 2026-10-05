import * as v from "valibot";
import { MESSAGE_CODE, REGEX } from "@common/constants";

export const topUpDto = v.pipe(
	v.object({
		user_id: v.pipe(
			v.string(MESSAGE_CODE.INVALID),
			v.nonEmpty(MESSAGE_CODE.REQUIRED),
			v.uuid(MESSAGE_CODE.INVALID_FORMAT),
		),
		user_email: v.pipe(
			v.string(MESSAGE_CODE.INVALID),
			v.nonEmpty(MESSAGE_CODE.REQUIRED),
			v.email(MESSAGE_CODE.INVALID_FORMAT),
		),
		card_number: v.pipe(
			v.string(MESSAGE_CODE.INVALID),
			v.transform((value) => value.replace(/\s/g, "")),
			v.nonEmpty(MESSAGE_CODE.REQUIRED),
			v.regex(REGEX.CARD_NUMBER, MESSAGE_CODE.INVALID_FORMAT),
			v.check(
				(value) => value.length >= 13 && value.length <= 19,
				MESSAGE_CODE.INVALID,
			),
		),
		expiration_date: v.pipe(
			v.string(MESSAGE_CODE.INVALID),
			v.regex(REGEX.CARD_EXPIRATION_DATE, MESSAGE_CODE.INVALID_FORMAT),
		),
		cvv: v.pipe(
			v.string(MESSAGE_CODE.INVALID),
			v.nonEmpty(MESSAGE_CODE.REQUIRED),
			v.regex(REGEX.CARD_CVV, MESSAGE_CODE.INVALID_FORMAT),
		),
		user_name: v.pipe(
			v.string(MESSAGE_CODE.INVALID),
			v.nonEmpty(MESSAGE_CODE.REQUIRED),
			v.regex(REGEX.NAME, MESSAGE_CODE.INVALID_FORMAT),
		),
		amount: v.pipe(
			v.number(MESSAGE_CODE.INVALID),
			v.integer(MESSAGE_CODE.MUST_BE_INTEGER),
			v.minValue(
				25,
				(issue) => `${MESSAGE_CODE.MIN_VALUE}:${issue.requirement}`,
			),
			v.maxValue(
				5000,
				(issue) => `${MESSAGE_CODE.MAX_VALUE}:${issue.requirement}`,
			),
		),
	}),
	v.transform(({ expiration_date, ...rest }) => {
		const [month, year] = expiration_date.split("/");
		return {
			...rest,
			expiration_month: Number(month),
			expiration_year: Number(year),
		};
	}),
);

export type TopUpDto = v.InferOutput<typeof topUpDto>;
