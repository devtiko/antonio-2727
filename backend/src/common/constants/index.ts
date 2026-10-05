export const MESSAGE_CODE = {
	INVALID: "invalid",
	REQUIRED: "required",
	INVALID_FORMAT: "invalid_format",
	MUST_BE_INTEGER: "must_be_integer",
	MIN_VALUE: "min_value",
	MAX_VALUE: "max_value",
} as const;

export const HTTP_STATUS_CODE = {
	OK: 200,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	NOT_FOUND: 404,
	UNPROCESSABLE_ENTITY: 422,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
} as const;

export const REGEX = {
	CARD_NUMBER: /^\d+$/,
	CARD_EXPIRATION_DATE: /^(0[1-9]|1[0-2])\/\d{2}$/,
	CARD_CVV: /^\d{3,4}$/,
	NAME: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
} as const;
