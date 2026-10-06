import { Button } from "@/common/ui/button";
import { Label } from "@/common/ui/label";
import { AMOUNTS } from "../utils";

interface QuickAmountsProps {
	amount: number;
	onSelect: (amount: number) => void;
}

export function QuickAmounts({ amount, onSelect }: QuickAmountsProps) {
	return (
		<div className="flex flex-col gap-2">
			<Label>Monto Rápido (MXN)</Label>
			<div className="grid grid-cols-4 gap-2">
				{AMOUNTS.map((option, index) => (
					<Button
						size="lg"
						type="button"
						key={`pay_amount_${index}`}
						onClick={() => onSelect(option)}
						variant={amount === option ? "default" : "outline"}
						className={`${
							amount === option
								? "shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
								: ""
						}`}
					>
						${option}
					</Button>
				))}
			</div>
		</div>
	);
}
