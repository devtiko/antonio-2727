import { AuthTabs } from "./components/AuthTabs";
import { AuthHero } from "./components/AuthHero";

export function AuthPage() {
	return (
		<div className="relative flex w-full max-w-5xl flex-col gap-y-6 items-center">
			<AuthHero />
			<AuthTabs />
		</div>
	);
}
