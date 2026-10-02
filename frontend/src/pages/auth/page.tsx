import { AuthTabs } from "./components/AuthTabs";
import { AuthHero } from "./components/AuthHero";

export function AuthPage() {
	return (
		<main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
			<div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl" />
			<div className="pointer-events-none absolute -right-32 -bottom-32 size-96 rounded-full bg-telemetry/10 blur-3xl" />
			<div className="relative flex w-full max-w-5xl flex-col gap-y-6 items-center">
				<AuthHero />
				<AuthTabs />
			</div>
		</main>
	);
}
