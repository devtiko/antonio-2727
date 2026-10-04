import { useState } from "react";
import { Outlet } from "react-router";
import { AppFooter } from "./Footer";
import { Header } from "./header/Header";
import { TopUpModal } from "@/common/components/TopUpModal";

export function AppLayout() {
	const [openTopUp, setOpenTopUp] = useState(false);

	return (
		<>
			<Header showTopUp={() => setOpenTopUp(true)} />
			<main className="relative w-full px-4 pb-4 pt-20">
				<Outlet />
			</main>
			<AppFooter />
			<TopUpModal
				open={openTopUp}
				onOpenChange={(value) => setOpenTopUp(value)}
				onConfirm={() => {}}
			/>
		</>
	);
}
