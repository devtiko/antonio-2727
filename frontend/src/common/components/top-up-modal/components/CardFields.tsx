import { HugeiconsIcon } from "@hugeicons/react";
import {
	Calendar01Icon,
	CreditCardIcon,
	Shield01Icon,
	UserIcon,
} from "@hugeicons/core-free-icons";
import { Controller, type Control } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/common/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/common/ui/input-group";
import { formatCardNumber, formatExpiry } from "../utils";
import type { TopUpSchema } from "../schemas";

interface CardFieldsProps {
	control: Control<TopUpSchema>;
}

export function CardFields({ control }: CardFieldsProps) {
	return (
		<>
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
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<div className="flex flex-col gap-3 rounded-xl border border-border/40 bg-surface-lowest/60 p-3.5">
				<Controller
					name="card_number"
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel htmlFor="card_number">Número de Tarjeta</FieldLabel>
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
						name="expiration_date"
						control={control}
						render={({ field, fieldState }) => (
							<Field>
								<FieldLabel htmlFor="expiration_date">
									Fecha de Vencimiento
								</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<HugeiconsIcon icon={Calendar01Icon} strokeWidth={2} />
									</InputGroupAddon>
									<InputGroupInput
										{...field}
										id="expiration_date"
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
					name="user_name"
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel htmlFor="user_name">Nombre Completo</FieldLabel>
							<InputGroup>
								<InputGroupAddon>
									<HugeiconsIcon icon={UserIcon} strokeWidth={2} />
								</InputGroupAddon>
								<InputGroupInput
									{...field}
									id="user_name"
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
		</>
	);
}
