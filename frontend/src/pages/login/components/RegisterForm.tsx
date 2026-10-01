import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/common/ui/button";
import { Checkbox } from "@/common/ui/checkbox";
import { Input } from "@/common/ui/input";
import { Label } from "@/common/ui/label";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [emailTouched, setEmailTouched] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const emailInvalid = emailTouched && !EMAIL_REGEX.test(email);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setEmailTouched(true);

		if (!EMAIL_REGEX.test(email)) {
			toast.error("Correo no válido", {
				description: "Revisa el correo electrónico antes de continuar.",
			});
			return;
		}

		toast.success(`¡Bienvenido, ${firstName || "Corredor"}!`, {
			description:
				"¡Registro completado! Bono de $50 USDG acreditado y tu caracol asignado.",
		});
	}

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1.5">
					<Label
						className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
						htmlFor="reg-firstname"
					>
						Nombre(s)
					</Label>
					<div className="relative flex items-center">
						<span className="material-symbols-outlined absolute left-3.5 text-[20px] text-muted-foreground">
							person
						</span>
						<Input
							className="h-10 rounded-xl pr-4 pl-11 dark:bg-input"
							id="reg-firstname"
							onChange={(event) => setFirstName(event.target.value)}
							placeholder="Ej. Mateo Fernando"
							required
							type="text"
							value={firstName}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label
						className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
						htmlFor="reg-lastname"
					>
						Apellido(s)
					</Label>
					<div className="relative flex items-center">
						<span className="material-symbols-outlined absolute left-3.5 text-[20px] text-muted-foreground">
							badge
						</span>
						<Input
							className="h-10 rounded-xl pr-4 pl-11 dark:bg-input"
							id="reg-lastname"
							onChange={(event) => setLastName(event.target.value)}
							placeholder="Ej. Caparazón Vargas"
							required
							type="text"
							value={lastName}
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<Label
					className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
					htmlFor="reg-email"
				>
					Correo Electrónico
				</Label>
				<div className="relative flex items-center">
					<span className="material-symbols-outlined absolute left-3.5 text-[20px] text-muted-foreground">
						mail
					</span>
					<Input
						aria-invalid={emailInvalid}
						className="h-10 rounded-xl pr-4 pl-11 dark:bg-input"
						id="reg-email"
						onBlur={() => setEmailTouched(true)}
						onChange={(event) => setEmail(event.target.value)}
						placeholder="tu.correo@ejemplo.com"
						required
						type="email"
						value={email}
					/>
				</div>
				{emailInvalid ? (
					<p className="flex items-center gap-1.5 text-xs text-destructive">
						<span className="material-symbols-outlined text-[16px]">
							error
						</span>
						Correo no válido
					</p>
				) : null}
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="flex flex-col gap-1.5">
					<Label
						className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
						htmlFor="reg-password"
					>
						Contraseña
					</Label>
					<div className="relative flex items-center">
						<span className="material-symbols-outlined absolute left-3.5 text-[20px] text-muted-foreground">
							lock_reset
						</span>
						<Input
							className="h-10 rounded-xl pr-4 pl-11 dark:bg-input"
							id="reg-password"
							onChange={(event) => setPassword(event.target.value)}
							placeholder="Mínimo 8 carácteres"
							required
							type="password"
							value={password}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-1.5">
					<Label
						className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
						htmlFor="reg-password-confirm"
					>
						Confirmar Contraseña
					</Label>
					<div className="relative flex items-center">
						<span className="material-symbols-outlined absolute left-3.5 text-[20px] text-muted-foreground">
							check_circle
						</span>
						<Input
							className="h-10 rounded-xl pr-4 pl-11 dark:bg-input"
							id="reg-password-confirm"
							onChange={(event) => setPasswordConfirm(event.target.value)}
							placeholder="Repetir clave"
							required
							type="password"
							value={passwordConfirm}
						/>
					</div>
				</div>
			</div>

			<Label className="flex cursor-pointer items-start gap-2 font-normal">
				<Checkbox
					checked={acceptedTerms}
					className="mt-0.5 dark:bg-input"
					onCheckedChange={(checked) => setAcceptedTerms(checked)}
					required
				/>
				<span className="text-xs text-muted-foreground">
					Acepto los Reglamentos del Gran Prix Deportivo, Declaración de Humedad
					Legal y Juego Responsable sin Sal (+18).
				</span>
			</Label>

			<Button
				className="h-11 w-full gap-2 text-sm font-semibold tracking-wider uppercase"
				size="lg"
				type="submit"
			>
				<span className="material-symbols-outlined text-[20px]">
					rocket_launch
				</span>
				Crear Cuenta
			</Button>
		</form>
	);
}
