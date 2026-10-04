import { DashboardHero } from "./components/DashboardHero";
import { BettingChart } from "./components/BettingChart";
import { RacingChart } from "./components/RacingChart";
import { RaceTicket } from "./components/RaceTicket";
import { RaceBoard } from "./components/RaceBoard";
import { useDashboard } from "./hooks/useDashboard";

export function DashboardPage() {
	const { runner, handlePlaceBet, handleSelectRunner } = useDashboard();
	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6">
			<DashboardHero />
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				<BettingChart />
				<RacingChart />
			</div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				<RaceBoard onSelectRunner={handleSelectRunner} />
				<RaceTicket runner={runner} onPlaceBet={handlePlaceBet} />
			</div>
		</div>
	);
}
