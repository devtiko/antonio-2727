import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./router/AppRouter";
import { Toaster } from "@/common/ui/sonner";
import "./index.css";

const root = document.getElementById("root");

createRoot(root!).render(
	<StrictMode>
		<AppRouter />
		<Toaster position="bottom-right" />
	</StrictMode>,
);
