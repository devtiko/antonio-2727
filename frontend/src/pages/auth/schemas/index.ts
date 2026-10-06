import * as v from "valibot";
import { NAME_REGEX, PASSWORD_REGEX } from "@/common/constants";
import type { LoginInput, RegisterInput } from "@/services/api/types";

export const loginSchema = v.object({
	email: v.pipe(
		v.string("Valor no válido"),
		v.nonEmpty("Campo requerido"),
		v.email("Correo electrónico no válido"),
	),
	password: v.pipe(
		v.string("Valor no válido"),
		v.trim(),
		v.nonEmpty("Campo requerido"),
		v.minLength(8, "La contraseña debe tener al menos 8 caracteres"),
	),
	remember: v.boolean(),
}) satisfies v.GenericSchema<LoginInput>;

export const registerSchema = v.pipe(
	v.object({
		first_name: v.pipe(
			v.string("Valor no válido"),
			v.trim(),
			v.nonEmpty("Campo requerido"),
			v.regex(NAME_REGEX, "Nombre no válido"),
		),
		last_name: v.optional(
			v.pipe(
				v.string("Valor no válido"),
				v.trim(),
				v.regex(NAME_REGEX, "Apellido no válido"),
			),
		),
		email: v.pipe(
			v.string("Valor no válido"),
			v.nonEmpty("Campo requerido"),
			v.email("Correo electrónico no válido"),
		),
		password: v.pipe(
			v.string("Valor no válido"),
			v.nonEmpty("Campo requerido"),
			v.regex(
				PASSWORD_REGEX,
				"La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
			),
		),
		confirm_password: v.pipe(
			v.string("Valor no válido"),
			v.trim(),
			v.nonEmpty("Campo requerido"),
		),
		accepted_terms: v.pipe(
			v.boolean(),
			v.check((value) => value, "Debes aceptar los términos y condiciones"),
		),
	}),
	v.forward(
		v.partialCheck(
			[["password"], ["confirm_password"]],
			(input) => input.password === input.confirm_password,
			"Las contraseñas no coinciden",
		),
		["confirm_password"],
	),
) satisfies v.GenericSchema<RegisterInput>;
