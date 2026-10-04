import { useOutletContext } from "react-router";
import { DashboardHero } from "./components/DashboardHero";
import { BettingChart } from "./components/BettingChart";
import { RacingChart } from "./components/RacingChart";
import { RaceTicket } from "./components/RaceTicket";
import { RaceBoard } from "./components/RaceBoard";
import type { DashboardContext } from "./hooks/useDashboard";

export function DashboardPage() {
	const {
		balance,
		selectedRunner,
		stake,
		totalReturn,
		profit,
		countdown,
		setStake,
		selectRunner,
		placeBet,
	} = useOutletContext<DashboardContext>();

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6">
			<DashboardHero
				balance={balance}
				gain="+$340.50"
				roi="+28.4%"
				activeBets={2}
				countdown={countdown}
				racesCompleted={6}
				racesTotal={6}
			/>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				<BettingChart />
				<RacingChart />
			</div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
				<RaceBoard onSelect={selectRunner} />
				<RaceTicket
					runner={selectedRunner}
					stake={stake}
					onStakeChange={setStake}
					totalReturn={totalReturn}
					profit={profit}
					onPlaceBet={placeBet}
				/>
			</div>
		</div>
	);
}
