import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router/AppRouter";
import { Toaster } from "@/common/ui/sonner";
import { AuthProvider } from "@/common/context/AuthContext";
import "./index.css";

const root = document.getElementById("root");

createRoot(root!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</BrowserRouter>
		<Toaster position="bottom-right" />
	</StrictMode>,
);
