import { Outlet } from "react-router";
import { AppFooter } from "./Footer";
import { Header } from "./header/Header";
import { useDashboard } from "@/pages/dashboard/hooks/useDashboard";
import { TopUpModal } from "@/common/components/TopUpModal";

export function AppLayout() {
	const dashboard = useDashboard();

	return (
		<>
			<Header
				balance={dashboard.balance}
				onRecargar={() => dashboard.setCardTopUpOpen(true)}
				onLogout={dashboard.logout}
			/>
			<main className="relative w-full px-4 pb-4 pt-20">
				<Outlet context={dashboard} />
			</main>
			<AppFooter />
			<TopUpModal
				open={dashboard.cardTopUpOpen}
				onOpenChange={dashboard.setCardTopUpOpen}
				onConfirm={dashboard.confirmCardTopUp}
			/>
		</>
	);
}
