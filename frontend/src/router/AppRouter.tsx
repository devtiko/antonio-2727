import { BrowserRouter, Route, Routes } from "react-router";
import { AuthLayout } from "../common/layout/AuthLayout";
import { AppLayout } from "../common/layout/app/Layout";
import { DashboardPage } from "../pages/dashboard/page";
import { AuthPage } from "../pages/auth/page";

export function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthLayout />}>
					<Route index element={<AuthPage />} />
				</Route>
				<Route element={<AppLayout />}>
					<Route path="dashboard" element={<DashboardPage />} />
				</Route>
				<Route path="*" element={<div>page not found</div>} />
			</Routes>
		</BrowserRouter>
	);
}
