import { KPI_STATS } from "../mock";
import { useAuthContext } from "@/common/context/AuthContext";
import { KpiStatGrid } from "./KpiStatGrid";

export function DashboardHero() {
	const { user } = useAuthContext();

	return (
		<section className="relative overflow-hidden rounded-2xl bg-line-to-r from-surface-lowest via-muted to-surface-low p-6 shadow-xl">
			<div className="pointer-events-none absolute -top-16 -right-16 size-80 rounded-full bg-primary/5 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-20 right-32 size-72 rounded-full bg-telemetry/5 blur-3xl" />
			<div className="flex max-w-2xl flex-col gap-y-1">
				<div className="flex items-center gap-2">
					<span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
						Temporada de Primavera • FICAV 2026
					</span>
					<span className="flex items-center gap-1 text-xs text-telemetry">
						<span className="size-2 rounded-full bg-muted-foreground" />
						Jornada Concluida
					</span>
				</div>
				<h1 className="font-serif text-3xl font-bold tracking-tight text-emphasis lg:text-5xl lg:leading-tight">
					¡Hola de nuevo,{" "}
					<span className="text-primary">{user?.first_name}</span>!
				</h1>
				<p className="text-sm text-muted-foreground">
					Jornada de hoy completada:{" "}
					<span className="font-semibold text-emphasis">
						{KPI_STATS.races.completed} de {KPI_STATS.races.total}
					</span>{" "}
					carreras disputadas en el circuito San Lento. Pista en mantenimiento y
					regado nocturno para el día de mañana.
				</p>
			</div>
			<KpiStatGrid />
		</section>
	);
}
