import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { LoadingPage } from "@/common/components/LoadingPage";
import { useAuthContext } from "@/common/context/AuthContext";

interface PrivateRouteProps {
	children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
	const location = useLocation();
	const { isAuthenticated, isLoadingUser } = useAuthContext();

	if (isLoadingUser) {
		return <LoadingPage />;
	}

	if (!isAuthenticated) {
		return <Navigate to="/" replace state={{ from: location }} />;
	}

	return children;
}
