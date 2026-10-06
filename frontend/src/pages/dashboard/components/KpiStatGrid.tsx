import {
	AlarmClockIcon,
	Ticket01Icon,
	TrendingUpIcon,
	Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { useAuthContext } from "@/common/context/AuthContext";
import { KPI_STATS } from "../mock";
import { KpiStatCard } from "./KpiStatCard";

export function KpiStatGrid() {
	const { user } = useAuthContext();

	return (
		<div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-4">
			<KpiStatCard
				title="Saldo Disponible"
				icon={Wallet01Icon}
				value={(user?.balance ?? 0).toFixed(2)}
				prefix="$"
				suffix="MXN"
				caption="SnailPay Verified"
			/>
			<KpiStatCard
				title="Ganancias del Día"
				icon={Ticket01Icon}
				value={`+$${KPI_STATS.gain.toFixed(2)}`}
				suffix="MXN"
				caption={`+${KPI_STATS.roi}% ROI de hoy`}
			/>
			<KpiStatCard
				title="Apuestas Activas"
				icon={TrendingUpIcon}
				value={String(KPI_STATS.active_bets)}
				suffix="tickets en juego"
				caption="Próxima ronda GP Lechuga"
				accent="text-jackpot"
			/>
			<KpiStatCard
				title="Próxima Salida"
				icon={AlarmClockIcon}
				value={KPI_STATS.next_race_time}
				caption="Mañana próxima carrera"
				accent="text-telemetry"
			/>
		</div>
	);
}
