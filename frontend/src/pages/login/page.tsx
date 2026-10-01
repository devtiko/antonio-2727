import { AuthTabs } from "./components/AuthTabs";
import { BrandHeader } from "./components/BrandHeader";

export function LoginPage() {
	return (
		<main className="dark relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-4 text-foreground md:p-8">
			<div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl" />
			<div className="pointer-events-none absolute -right-32 -bottom-32 size-96 rounded-full bg-secondary/10 blur-3xl" />
			<div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/40 blur-2xl" />

			<div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
				<BrandHeader />
				<AuthTabs />
			</div>
		</main>
	);
}
