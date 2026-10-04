interface UserBalanceProps {
	balance: number;
}

export const UserBalance = ({ balance }: UserBalanceProps) => {
	return (
		<div className="rounded-full bg-surface-low flex flex-col text-right px-4 py-1.5 shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_8%,transparent)]">
			<span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
				Saldo disponible
			</span>
			<span className="font-serif text-base font-semibold text-telemetry">
				${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
				<span className="ml-1 text-xs font-normal text-muted-foreground">
					MXN
				</span>
			</span>
		</div>
	);
};
