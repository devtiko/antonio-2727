import { Route, Routes } from "react-router";
import { AppLayout } from "../common/layout/app/Layout";
import { PublicLayout } from "../common/layout/PublicLayout";
import { PrivateRoute } from "./PrivateRoute";
import { DashboardPage } from "../pages/dashboard/page";
import { AuthPage } from "../pages/auth/page";
import { NotFoundPage } from "../pages/not-found/page";

export function AppRouter() {
	return (
		<Routes>
			<Route element={<PublicLayout />}>
				<Route index element={<AuthPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
			<Route
				element={
					<PrivateRoute>
						<AppLayout />
					</PrivateRoute>
				}
			>
				<Route path="dashboard" element={<DashboardPage />} />
			</Route>
		</Routes>
	);
}
