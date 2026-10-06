import { RACE_TIMELINE } from "../mock";

export function RacingTimeline() {
	return (
		<div className="flex flex-col gap-2 rounded-xl bg-surface-lowest/80 p-4">
			<span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
				Cronología Oficial • Jornada Completa (6/6)
			</span>
			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
				{RACE_TIMELINE.map((race, index) => (
					<div
						key={`race_timeline_${index}`}
						className="flex items-center gap-1.5 rounded-lg bg-muted p-1.5 text-xs"
					>
						<span className="font-bold text-primary">{race.code}:</span>
						<span className="truncate text-emphasis">{race.winner}</span>
						<span className="ml-auto text-[13px] font-medium tracking-wide text-muted-foreground">
							{race.time}
						</span>
					</div>
				))}
			</div>
			<span className="text-[10px] text-muted-foreground italic">
				*Récord de pista del día en Carrera 3 registrado con sensor óptico.
			</span>
		</div>
	);
}
