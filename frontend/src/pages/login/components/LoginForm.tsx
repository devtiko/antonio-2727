import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/common/ui/button";
import { Checkbox } from "@/common/ui/checkbox";
import { Input } from "@/common/ui/input";
import { Label } from "@/common/ui/label";

export function LoginForm() {
	const [email, setEmail] = useState("mateo.caparazon@turbosnail.bet");
	const [password, setPassword] = useState("SuperTurbo2025");
	const [remember, setRemember] = useState(true);
	const [showPassword, setShowPassword] = useState(false);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		toast.success("¡Acelerador Activado!", {
			description: `Bienvenido de nuevo. Token SnailPay revalidado con éxito para ${email}`,
		});
	}

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
			<div className="flex flex-col gap-1.5">
				<Label
					className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
					htmlFor="login-email"
				>
					Correo Electrónico o Slug-Tag
				</Label>
				<div className="relative flex items-center">
					<span className="material-symbols-outlined absolute left-3.5 text-[20px] text-muted-foreground">
						alternate_email
					</span>
					<Input
						className="h-11 rounded-xl pr-4 pl-11 dark:bg-input"
						id="login-email"
						onChange={(event) => setEmail(event.target.value)}
						placeholder="tu.nombre@slime.com"
						required
						type="email"
						value={email}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-1.5">
				<div className="flex items-center justify-between">
					<Label
						className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase"
						htmlFor="login-password"
					>
						Contraseña Secreta
					</Label>
					<button
						className="text-xs text-primary hover:underline"
						onClick={() =>
							toast("Enlace de recuperación enviado", {
								description:
									"Te enviamos las instrucciones por telégrafo de baba.",
							})
						}
						type="button"
					>
						¿Olvidaste tu caparazón?
					</button>
				</div>
				<div className="relative flex items-center">
					<span className="material-symbols-outlined absolute left-3.5 text-[20px] text-muted-foreground">
						key
					</span>
					<Input
						className="h-11 rounded-xl pr-11 pl-11 dark:bg-input"
						id="login-password"
						onChange={(event) => setPassword(event.target.value)}
						placeholder="••••••••••••"
						required
						type={showPassword ? "text" : "password"}
						value={password}
					/>
					<Button
						aria-label={
							showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
						}
						className="absolute right-2 text-muted-foreground hover:text-foreground"
						onClick={() => setShowPassword((value) => !value)}
						size="icon-sm"
						type="button"
						variant="ghost"
					>
						<span className="material-symbols-outlined text-[20px]">
							{showPassword ? "visibility_off" : "visibility"}
						</span>
					</Button>
				</div>
			</div>

			<Label className="flex cursor-pointer items-center gap-2 font-normal">
				<Checkbox
					checked={remember}
					className="dark:bg-input"
					onCheckedChange={(checked) => setRemember(checked)}
				/>
				<span className="text-xs text-foreground">
					Recordar mis antenas (Mantener sesión activa 30 días)
				</span>
			</Label>

			<Button
				className="h-11 w-full gap-2 text-sm font-semibold tracking-wider uppercase"
				size="lg"
				type="submit"
			>
				<span className="material-symbols-outlined text-[20px]">
					sports_score
				</span>
				Entrar a la Pista
			</Button>
		</form>
	);
}
