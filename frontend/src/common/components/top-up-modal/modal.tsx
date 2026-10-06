import { HugeiconsIcon } from "@hugeicons/react";
import { Payment01Icon, SquareLock01Icon } from "@hugeicons/core-free-icons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/common/ui/dialog";
import { AMOUNTS } from "./utils";
import { Button } from "@/common/ui/button";
import { FieldGroup } from "@/common/ui/field";
import { useTopUp } from "./hooks/useTopUp";
import { Spinner } from "@/common/ui/spinner";
import { CardFields } from "./components/CardFields";
import { QuickAmounts } from "./components/QuickAmounts";
import { useForm, useWatch } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { topUpSchema, type TopUpSchema } from "./schemas";
import { useEffect } from "react";

interface TopUpModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function TopUpModal({ open, onOpenChange }: TopUpModalProps) {
	const { handleTopUp, isPendingTopUp } = useTopUp({ onOpenChange });

	const { control, handleSubmit, reset, setValue } = useForm<TopUpSchema>({
		resolver: valibotResolver(topUpSchema),
		mode: "onBlur",
		defaultValues: {
			amount: AMOUNTS[0],
			card_number: "",
			expiration_date: "",
			user_name: "",
			cvv: "",
		},
	});

	const amountValue = useWatch({ control, name: "amount" });

	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open, reset]);

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

				<QuickAmounts
					amount={amountValue}
					onSelect={(option) => setValue("amount", option)}
				/>

				<form
					noValidate
					id="form-top-up"
					onSubmit={handleSubmit(handleTopUp)}
					className="flex flex-col gap-y-4"
				>
					<FieldGroup className="gap-4">
						<CardFields control={control} />
					</FieldGroup>
				</form>
				<DialogFooter className="sm:flex-col sm:items-stretch">
					<div className="flex flex-col-reverse gap-2 sm:flex-row">
						<Button
							size="lg"
							type="button"
							variant="secondary"
							className="flex-1"
							disabled={isPendingTopUp}
							onClick={() => onOpenChange(false)}
						>
							Cancelar
						</Button>
						<Button
							size="lg"
							type="submit"
							form="form-top-up"
							disabled={isPendingTopUp}
							className="flex-1 shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
						>
							{isPendingTopUp ? (
								<Spinner />
							) : (
								<HugeiconsIcon icon={Payment01Icon} strokeWidth={2} />
							)}
							Confirmar Recarga
						</Button>
					</div>
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
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
