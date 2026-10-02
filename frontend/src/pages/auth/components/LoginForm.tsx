import { HugeiconsIcon } from "@hugeicons/react";
import {
	Mail01Icon,
	Medal01Icon,
	ViewIcon,
	ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/common/ui/button";
import { Checkbox } from "@/common/ui/checkbox";
import { Spinner } from "@/common/ui/spinner";
import { FieldGroup } from "@/common/ui/field";
import { useLogin } from "../hooks/useLogin";
import { Field, FieldError, FieldLabel } from "@/common/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/common/ui/input-group";
import type { LoginInput } from "@/services/api/types";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { loginSchema } from "../schemas";
import SquareLock01Icon from "@hugeicons/core-free-icons/SquareLock01Icon";

export function LoginForm() {
	const { handleLogin, showPassword, togglePassword, isPendingLogin } =
		useLogin();

	const { control, handleSubmit } = useForm<LoginInput>({
		resolver: valibotResolver(loginSchema),
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
			remember: true,
		},
	});

	return (
		<form
			id="form-login"
			className="flex flex-col gap-y-4 w-full"
			onSubmit={handleSubmit(handleLogin)}
		>
			<FieldGroup className="gap-4">
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
									placeholder="Ingresa tu contraseña"
									type={showPassword ? "text" : "password"}
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
					name="remember"
					control={control}
					render={({ field, fieldState }) => (
						<Field orientation="horizontal">
							<Checkbox
								id="remember"
								name={field.name}
								aria-invalid={fieldState?.invalid}
								checked={field.value}
								onCheckedChange={(checked) => field.onChange(checked)}
							/>
							<FieldLabel
								htmlFor="remember"
								className="text-xs font-normal cursor-pointer"
							>
								Recordar mis antenas (Mantener sesión activa 30 días)
							</FieldLabel>
						</Field>
					)}
				/>
			</FieldGroup>
			<Button
				size="lg"
				type="submit"
				form="form-login"
				disabled={isPendingLogin}
				className="uppercase font-semibold w-full"
			>
				{isPendingLogin ? (
					<Spinner />
				) : (
					<HugeiconsIcon icon={Medal01Icon} strokeWidth={2} />
				)}
				Entrar a la Pista
			</Button>
		</form>
	);
}
