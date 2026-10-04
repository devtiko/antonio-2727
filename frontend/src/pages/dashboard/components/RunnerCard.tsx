import { RANK_COLOR, type Runner } from "../mock";

interface RunnerCardProps {
	runner: Runner;
	onSelect: (runner: Runner) => void;
}

export function RunnerCard({ runner, onSelect }: RunnerCardProps) {
	const rankColor = RANK_COLOR[runner.lane];

	return (
		<button
			type="button"
			onClick={() => onSelect(runner)}
			className="flex cursor-pointer flex-col justify-between rounded-xl bg-surface-low p-3.5 transition-all hover:bg-muted sm:flex-row sm:items-center"
		>
			<div className="flex items-center gap-3">
				<span
					className={`flex size-8 items-center justify-center rounded-lg font-serif text-base font-bold ${
						rankColor
							? `text-background`
							: "bg-surface-highest text-muted-foreground"
					}`}
					style={rankColor ? { backgroundColor: rankColor } : undefined}
				>
					{`L${runner.lane}`}
				</span>
				<div className="flex flex-col">
					<span className="font-serif text-base font-semibold text-emphasis">
						{runner.name}
					</span>
					<span className="text-xs text-muted-foreground">
						{`Peso concha: ${runner.weight}g`}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<div className="flex flex-col text-right">
					<span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
						Forma
					</span>
					<span className="text-[13px] font-medium tracking-wide text-emphasis">
						{runner.form.join(" - ")}
					</span>
				</div>
				<div className="group/odds flex min-w-[72px] flex-col items-center rounded-xl bg-surface-high px-4 py-2 transition-all hover:bg-surface-highest">
					<span className="text-[10px] font-bold uppercase tracking-wider">
						GANA
					</span>
					<span
						className={`font-serif text-base font-bold transition-colors ${
							rankColor ? "" : "text-emphasis"
						}`}
						style={rankColor ? { color: rankColor } : undefined}
					>
						{runner.odds.toFixed(2)}
					</span>
				</div>
			</div>
		</button>
	);
}
