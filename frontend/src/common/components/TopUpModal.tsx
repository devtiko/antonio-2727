import { useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Calendar01Icon,
	CreditCardIcon,
	Payment01Icon,
	Shield01Icon,
	SquareLock01Icon,
	UserIcon,
} from "@hugeicons/core-free-icons";
import { Controller, useForm, useWatch } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/common/ui/dialog";
import { Button } from "@/common/ui/button";
import { Label } from "@/common/ui/label";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/common/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/common/ui/input-group";

const AMOUNTS = [25, 50, 100, 250];

const topUpSchema = v.object({
	amount: v.pipe(
		v.number("Valor no válido"),
		v.minValue(25, "El monto mínimo es $25 MXN"),
		v.maxValue(5000, "El monto máximo es $5000 MXN"),
	),
	card_number: v.pipe(
		v.string("Valor no válido"),
		v.nonEmpty("Campo requerido"),
		v.minLength(15, "Número de tarjeta incompleto"),
	),
	expiry: v.pipe(
		v.string("Valor no válido"),
		v.nonEmpty("Campo requerido"),
		v.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Fecha no válida (MM/AA)"),
	),
	cvv: v.pipe(
		v.string("Valor no válido"),
		v.nonEmpty("Campo requerido"),
		v.minLength(3, "CVV incompleto"),
		v.maxLength(4, "CVV no válido"),
	),
	card_name: v.pipe(
		v.string("Valor no válido"),
		v.trim(),
		v.nonEmpty("Campo requerido"),
	),
});

type TopUpInput = v.InferOutput<typeof topUpSchema>;

function formatCardNumber(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 16);
	return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 4);
	if (digits.length <= 2) return digits;
	return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

interface TopUpModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: (amount: number) => void;
}

export function TopUpModal({ open, onOpenChange, onConfirm }: TopUpModalProps) {
	const { control, handleSubmit, reset, setValue } = useForm<TopUpInput>({
		resolver: valibotResolver(topUpSchema),
		mode: "onBlur",
		defaultValues: {
			amount: AMOUNTS[0],
			card_number: "",
			expiry: "",
			cvv: "",
			card_name: "",
		},
	});

	const amountValue = useWatch({ control, name: "amount" });

	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open, reset]);

	const onSubmit = (data: TopUpInput) => {
		onConfirm(data.amount);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="bg-surface-low ring-0">
				<DialogHeader>
					<DialogTitle className="font-serif text-xl font-semibold tracking-tight text-emphasis">
						Recarga de Saldo
					</DialogTitle>
					<DialogDescription className="text-xs text-muted-foreground">
						Acredita fondos al instante a tu cuenta
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<Label>Monto Rápido (MXN)</Label>
					<div className="grid grid-cols-4 gap-2">
						{AMOUNTS.map((option) => (
							<Button
								size="lg"
								key={option}
								type="button"
								onClick={() => setValue("amount", option)}
								variant={amountValue === option ? "default" : "outline"}
								className={`${
									amountValue === option
										? "shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
										: ""
								}`}
							>
								${option}
							</Button>
						))}
					</div>
				</div>

				<form
					noValidate
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-y-4"
				>
					<FieldGroup className="gap-4">
						<Controller
							name="amount"
							control={control}
							render={({ field, fieldState }) => (
								<Field>
									<InputGroup>
										<InputGroupAddon>$</InputGroupAddon>
										<InputGroupInput
											id="amount"
											type="number"
											min={5}
											max={5000}
											placeholder="Ingresa un monto"
											aria-label="Monto Rápido (MXN)"
											value={field.value}
											onChange={(event) =>
												field.onChange(Number(event.target.value) || 0)
											}
											aria-invalid={fieldState.invalid}
										/>
										<InputGroupAddon align="inline-end">MXN</InputGroupAddon>
									</InputGroup>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-surface-lowest/60 p-3.5">
							<Controller
								name="card_number"
								control={control}
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel htmlFor="card_number">
											Número de Tarjeta
										</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												id="card_number"
												inputMode="numeric"
												placeholder="0000 0000 0000 0000"
												maxLength={19}
												aria-invalid={fieldState.invalid}
												onChange={(event) =>
													field.onChange(formatCardNumber(event.target.value))
												}
											/>
										</InputGroup>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							<div className="grid grid-cols-2 gap-3">
								<Controller
									name="expiry"
									control={control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel htmlFor="expiry">
												Fecha de Vencimiento
											</FieldLabel>
											<InputGroup>
												<InputGroupAddon>
													<HugeiconsIcon
														icon={Calendar01Icon}
														strokeWidth={2}
													/>
												</InputGroupAddon>
												<InputGroupInput
													{...field}
													id="expiry"
													inputMode="numeric"
													placeholder="MM/AA"
													maxLength={5}
													aria-invalid={fieldState.invalid}
													onChange={(event) =>
														field.onChange(formatExpiry(event.target.value))
													}
												/>
											</InputGroup>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>

								<Controller
									name="cvv"
									control={control}
									render={({ field, fieldState }) => (
										<Field>
											<FieldLabel htmlFor="cvv">CVV</FieldLabel>
											<InputGroup>
												<InputGroupAddon>
													<HugeiconsIcon
														icon={Shield01Icon}
														strokeWidth={2}
														className="text-muted-foreground"
													/>
												</InputGroupAddon>
												<InputGroupInput
													{...field}
													id="cvv"
													type="password"
													inputMode="numeric"
													placeholder="•••"
													maxLength={4}
													aria-invalid={fieldState.invalid}
													onChange={(event) =>
														field.onChange(
															event.target.value.replace(/\D/g, "").slice(0, 4),
														)
													}
													className="text-sm text-emphasis"
												/>
											</InputGroup>
											{fieldState.invalid && (
												<FieldError errors={[fieldState.error]} />
											)}
										</Field>
									)}
								/>
							</div>

							<Controller
								name="card_name"
								control={control}
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel htmlFor="card_name">Nombre Completo</FieldLabel>
										<InputGroup>
											<InputGroupAddon>
												<HugeiconsIcon icon={UserIcon} strokeWidth={2} />
											</InputGroupAddon>
											<InputGroupInput
												{...field}
												id="card_name"
												placeholder="Nombre impreso en la tarjeta"
												aria-invalid={fieldState.invalid}
											/>
										</InputGroup>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</div>
					</FieldGroup>
					<DialogFooter>
						<Button
							size="lg"
							type="button"
							variant="secondary"
							className="flex-1"
							onClick={() => onOpenChange(false)}
						>
							Cancelar
						</Button>
						<Button
							size="lg"
							type="submit"
							className="flex-1 shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
						>
							<HugeiconsIcon icon={Payment01Icon} strokeWidth={2} />
							Confirmar Recarga
						</Button>
					</DialogFooter>
					<div className="flex items-center justify-center gap-1.5">
						<HugeiconsIcon
							strokeWidth={2}
							icon={SquareLock01Icon}
							className="size-3.5 text-telemetry"
						/>
						<span className="text-xs text-muted-foreground/70">
							Pago procesado de forma segura por SnailPay
						</span>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
