import type { ReactNode } from "react";
import { Outlet } from "react-router";

interface PublicLayoutProps {
	children?: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
	return (
		<main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4">
			<div className="pointer-events-none absolute -top-16 -left-16 size-96 rounded-full bg-primary/10 blur-3xl" />
			<div className="pointer-events-none absolute -right-16 -bottom-16 size-96 rounded-full bg-telemetry/10 blur-3xl" />
			{children ? children : <Outlet />}
		</main>
	);
}
