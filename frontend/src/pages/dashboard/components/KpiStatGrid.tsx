import {
	AlarmClockIcon,
	Ticket01Icon,
	TrendingUpIcon,
	Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { KpiStatCard } from "./KpiStatCard";

interface KpiStatGridProps {
	balance: number;
	gain: string;
	roi: string;
	activeBets: number;
	countdown: string;
}

export function KpiStatGrid({
	balance,
	gain,
	roi,
	activeBets,
	countdown,
}: KpiStatGridProps) {
	return (
		<div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-4">
			<KpiStatCard
				title="Saldo Disponible"
				icon={Wallet01Icon}
				value={balance.toFixed(2)}
				prefix="$"
				suffix="MXN"
				caption="SnailPay Verified"
			/>
			<KpiStatCard
				title="Ganancias del Día"
				icon={Ticket01Icon}
				value={gain}
				suffix="MXN"
				caption={`${roi} ROI de hoy`}
			/>
			<KpiStatCard
				title="Apuestas Activas"
				icon={TrendingUpIcon}
				value={String(activeBets)}
				suffix="tickets en juego"
				caption="Próxima ronda GP Lechuga"
				accent="text-jackpot"
			/>
			<KpiStatCard
				title="Próxima Salida"
				icon={AlarmClockIcon}
				value={countdown}
				caption="Mañana próxima carrera"
				accent="text-telemetry"
			/>
		</div>
	);
}
