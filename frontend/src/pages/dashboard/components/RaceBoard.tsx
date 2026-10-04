import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon, RulerIcon } from "@hugeicons/core-free-icons";
import { RunnerCard } from "./RunnerCard";
import { RUNNERS, type Runner } from "../mock";

interface RaceBoardProps {
	onSelectRunner: (runner: Runner) => void;
}

export function RaceBoard({ onSelectRunner }: RaceBoardProps) {
	return (
		<section className="flex flex-col gap-4 lg:col-span-8">
			<div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
				<div className="flex flex-col">
					<h2 className="font-serif text-3xl font-bold tracking-tight text-emphasis">
						Gran Premio "Lechuga Dorada"
					</h2>
					<p className="text-sm text-muted-foreground">
						Circuito San Lento • Registro de heats anticipados activo
					</p>
				</div>
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-2 rounded-xl bg-surface-high px-3 py-1.5">
						<HugeiconsIcon
							icon={Clock01Icon}
							strokeWidth={2}
							className="size-4 text-primary"
						/>
						<span className="text-[11px] font-bold uppercase tracking-wider text-primary">
							Mañana 09:00 AM
						</span>
					</div>
					<div className="flex items-center gap-2 rounded-xl bg-surface-high px-3 py-1.5">
						<HugeiconsIcon
							icon={RulerIcon}
							strokeWidth={2}
							className="size-4 text-telemetry"
						/>
						<span className="text-[11px] font-bold uppercase tracking-wider text-emphasis">
							1.20 Metros
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-2.5">
				{RUNNERS.map((runner, index) => (
					<RunnerCard
						runner={runner}
						key={`runner_${index}`}
						onSelect={() => onSelectRunner(runner)}
					/>
				))}
			</div>
		</section>
	);
}
