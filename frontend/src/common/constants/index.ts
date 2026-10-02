export const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const NAME_REGEX = /^[\p{L}\s]*$/u;

export const ONE_DAY_MS = 1000 * 60 * 60 * 24;
