import {
	useState,
	createContext,
	useContext,
	type ReactNode,
	useEffect,
} from "react";
import type { User } from "../types";
import { ApiService } from "../../services/api";
import { useNavigate } from "react-router";

interface AuthContextValue {
	user: Partial<User> | null;
	isLoadingUser: boolean;
	isAuthenticated: boolean;
	logout: () => void;
	updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const navigate = useNavigate();
	const [user, setUser] = useState<Partial<User> | null>(null);
	const [isLoadingUser, setIsLoadingUser] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				setIsLoadingUser(true);
				const response = ApiService.me();
				setUser(response || null);
			} catch (e: unknown) {
				console.log(e);
				setUser(null);
			} finally {
				setTimeout(() => {
					setIsLoadingUser(false);
				}, 500);
			}
		})();
	}, []);

	const updateUser = async (data: Partial<User>) => {
		setUser((prev) => {
			if (!prev) return data;
			return { ...prev, ...data };
		});
	};

	const logout = () => {
		ApiService.logout();
		setUser(null);
		navigate("/", { replace: true });
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				logout,
				updateUser,
				isLoadingUser,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}

	return context;
}
