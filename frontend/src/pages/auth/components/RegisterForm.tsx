import { HugeiconsIcon } from "@hugeicons/react";
import {
	Mail01Icon,
	SquareLock01Icon,
	StartUp01Icon,
	UserIcon,
	ViewIcon,
	ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { Controller, useForm, useWatch } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Button } from "@/common/ui/button";
import { Checkbox } from "@/common/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/common/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/common/ui/input-group";
import { Spinner } from "@/common/ui/spinner";
import type { RegisterInput } from "@/services/api/types";
import { useRegister } from "../hooks/useRegister";
import { registerSchema } from "../schemas";

export function RegisterForm() {
	const {
		handleRegister,
		showPassword,
		showConfirmPassword,
		togglePassword,
		toggleConfirmPassword,
		isPendingRegister,
	} = useRegister();

	const { control, handleSubmit } = useForm<RegisterInput>({
		resolver: valibotResolver(registerSchema),
		mode: "onBlur",
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			confirm_password: "",
			accepted_terms: false,
		},
	});

	const acceptedTerms = useWatch({ control, name: "accepted_terms" });

	return (
		<form
			id="form-register"
			className="flex flex-col gap-y-4 w-full"
			onSubmit={handleSubmit(handleRegister)}
		>
			<FieldGroup className="gap-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Controller
						name="first_name"
						control={control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="first_name">Nombre(s)</FieldLabel>
								<InputGroup>
									<InputGroupInput
										{...field}
										id="first_name"
										aria-invalid={fieldState?.invalid}
										placeholder="Ej. Mateo Fernando"
										autoComplete="off"
									/>
									<InputGroupAddon>
										<HugeiconsIcon icon={UserIcon} strokeWidth={2} />
									</InputGroupAddon>
								</InputGroup>
								{fieldState?.invalid && (
									<FieldError errors={[fieldState?.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="last_name"
						control={control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="last_name">Apellido(s)</FieldLabel>
								<InputGroup>
									<InputGroupInput
										{...field}
										id="last_name"
										aria-invalid={fieldState?.invalid}
										placeholder="Ej. Caparazón Vargas"
										autoComplete="off"
									/>
									<InputGroupAddon>
										<HugeiconsIcon icon={UserIcon} strokeWidth={2} />
									</InputGroupAddon>
								</InputGroup>
								{fieldState?.invalid && (
									<FieldError errors={[fieldState?.error]} />
								)}
							</Field>
						)}
					/>
				</div>
				<Controller
					name="email"
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									id="email"
									aria-invalid={fieldState?.invalid}
									placeholder="tucorreo@ejemplo.com"
									autoComplete="off"
								/>
								<InputGroupAddon>
									<HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
								</InputGroupAddon>
							</InputGroup>
							{fieldState?.invalid && (
								<FieldError errors={[fieldState?.error]} />
							)}
						</Field>
					)}
				/>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Controller
						name="password"
						control={control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="password">Contraseña</FieldLabel>
								<InputGroup>
									<InputGroupInput
										{...field}
										id="password"
										aria-invalid={fieldState?.invalid}
										placeholder="Mínimo 8 caracteres"
										type={showPassword ? "text" : "password"}
										autoComplete="new-password"
									/>
									<InputGroupAddon>
										<HugeiconsIcon icon={SquareLock01Icon} strokeWidth={2} />
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<HugeiconsIcon
											className="cursor-pointer"
											onClick={togglePassword}
											icon={showPassword ? ViewOffIcon : ViewIcon}
											strokeWidth={2}
										/>
									</InputGroupAddon>
								</InputGroup>
								{fieldState?.invalid && (
									<FieldError errors={[fieldState?.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="confirm_password"
						control={control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="confirm_password">
									Confirmar contraseña
								</FieldLabel>
								<InputGroup>
									<InputGroupInput
										{...field}
										id="confirm_password"
										aria-invalid={fieldState?.invalid}
										placeholder="Repetir contraseña"
										type={showConfirmPassword ? "text" : "password"}
										autoComplete="new-password"
									/>
									<InputGroupAddon>
										<HugeiconsIcon icon={SquareLock01Icon} strokeWidth={2} />
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<HugeiconsIcon
											className="cursor-pointer"
											onClick={toggleConfirmPassword}
											icon={showConfirmPassword ? ViewOffIcon : ViewIcon}
											strokeWidth={2}
										/>
									</InputGroupAddon>
								</InputGroup>
								{fieldState?.invalid && (
									<FieldError errors={[fieldState?.error]} />
								)}
							</Field>
						)}
					/>
				</div>
				<Controller
					name="accepted_terms"
					control={control}
					render={({ field, fieldState }) => (
						<Field orientation="horizontal" className="items-start">
							<Checkbox
								id="accepted_terms"
								name={field.name}
								aria-invalid={fieldState?.invalid}
								checked={field.value}
								onCheckedChange={(checked) => field.onChange(checked)}
								className="mt-0.5"
							/>
							<FieldLabel
								htmlFor="accepted_terms"
								className="text-xs font-normal cursor-pointer text-muted-foreground"
							>
								Acepto los Reglamentos del Gran Prix Deportivo, Declaración de
								Humedad Legal y Juego Responsable sin Sal (+18).
							</FieldLabel>
						</Field>
					)}
				/>
			</FieldGroup>
			<Button
				size="lg"
				type="submit"
				form="form-register"
				disabled={isPendingRegister || !acceptedTerms}
				className="uppercase font-semibold w-full"
			>
				{isPendingRegister ? (
					<Spinner />
				) : (
					<HugeiconsIcon icon={StartUp01Icon} strokeWidth={2} />
				)}
				Crear Cuenta
			</Button>
		</form>
	);
}
