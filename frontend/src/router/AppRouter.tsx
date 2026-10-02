import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardPage } from "../pages/dashboard/page";
import { AuthPage } from "../pages/auth/page";

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<AuthPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="*" element={<div>page not found</div>} />
			</Routes>
		</BrowserRouter>
	);
}
