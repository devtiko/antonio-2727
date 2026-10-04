import { useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { BoltIcon } from "@hugeicons/core-free-icons";
import { Controller, useForm, useWatch } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/common/ui/card";
import { Button } from "@/common/ui/button";
import { Label } from "@/common/ui/label";
import { Field, FieldError } from "@/common/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/common/ui/input-group";
import { formatMoney } from "../utils";
import { raceTicketSchema } from "../schemas";
import { RACE_TICKET_AMOUNTS, type Runner } from "../mock";
import type { TicketInput } from "@/services/api/types";

interface QuickBetslipProps {
	runner: Runner | null;
	onPlaceBet: (data: TicketInput) => void;
}

export function RaceTicket({ runner, onPlaceBet }: QuickBetslipProps) {
	const { control, setValue, handleSubmit } = useForm<TicketInput>({
		mode: "onChange",
		resolver: valibotResolver(raceTicketSchema),
		defaultValues: { amount: RACE_TICKET_AMOUNTS[0] },
	});

	const currentAmount = useWatch({ control, name: "amount" });

	const { total, profit } = useMemo(() => {
		const total = currentAmount * (runner?.odds || 0);
		return { total, profit: total - currentAmount };
	}, [currentAmount, runner?.odds]);

	return (
		<Card className="shadow-xl ring-0 lg:col-span-4">
			<CardHeader>
				<CardTitle className="text-xl tracking-tight font-serif font-semibold text-emphasis">
					Boleto Rápido
				</CardTitle>
			</CardHeader>

			<CardContent className="gap-6">
				{runner && (
					<div className="flex flex-col gap-2 rounded-xl bg-muted p-4">
						<div className="flex items-center justify-between">
							<span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
								Caracol Seleccionado
							</span>
							<span className="text-[11px] font-bold uppercase tracking-wider text-primary">
								{runner?.odds.toFixed(2)}x
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="font-serif text-xl font-semibold tracking-tight text-emphasis">
								{runner?.name}
							</span>
							<span className="text-xs text-muted-foreground">
								{`L${runner?.lane}`}
							</span>
						</div>
					</div>
				)}

				<div className="flex flex-col gap-4">
					<Label>Monto de Apuesta (MXN)</Label>
					<div className="grid grid-cols-3 gap-4">
						{RACE_TICKET_AMOUNTS.map((amount, index) => (
							<Button
								size="lg"
								type="button"
								key={`ticket_amount_${index}`}
								variant={currentAmount === amount ? "default" : "outline"}
								onClick={() => setValue("amount", amount)}
								className={
									currentAmount === amount
										? "shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
										: ""
								}
							>
								${amount}
							</Button>
						))}
					</div>
					<form
						id="form-ticket"
						onSubmit={handleSubmit(onPlaceBet)}
						className="contents"
					>
						<Controller
							name="amount"
							control={control}
							render={({ field, fieldState }) => (
								<Field>
									<InputGroup>
										<InputGroupAddon>$</InputGroupAddon>
										<InputGroupInput
											{...field}
											id="amount"
											type="number"
											placeholder="Ingresa un monto"
											aria-label="Monto Rápido (MXN)"
											aria-invalid={fieldState.invalid}
											onChange={(event) => {
												const value = Number(event.target.value) || 0;
												field.onChange(value);
											}}
										/>
										<InputGroupAddon align="inline-end">MXN</InputGroupAddon>
									</InputGroup>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</form>
				</div>

				<div className="flex flex-col gap-1 rounded-xl bg-surface-lowest/60 p-4">
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>Ganancia Estimada:</span>
						<span className="font-semibold text-emphasis">
							+${formatMoney(profit)} MXN
						</span>
					</div>
					<div className="flex items-baseline justify-between">
						<span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
							Retorno Total:
						</span>
						<span className="font-serif text-3xl font-bold text-primary">
							${formatMoney(total)}
						</span>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex-col gap-2">
				<Button
					size="lg"
					type="submit"
					form="form-ticket"
					className="w-full shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
				>
					<HugeiconsIcon icon={BoltIcon} strokeWidth={2} />
					Confirmar Apuesta
				</Button>
				<span className="text-center text-[11px] text-muted-foreground">
					Apuestas protegidas por FICAV FairPlay™
				</span>
			</CardFooter>
		</Card>
	);
}
