import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardPage } from "../pages/dashboard/page";
import { LoginPage } from "../pages/login/page";

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<LoginPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="*" element={<div>page not found</div>} />
			</Routes>
		</BrowserRouter>
	);
}
