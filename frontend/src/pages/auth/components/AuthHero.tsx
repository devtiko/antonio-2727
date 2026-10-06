import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkBadge02Icon } from "@hugeicons/core-free-icons";

export function AuthHero() {
	return (
		<div className="flex flex-col items-center gap-y-2">
			<div className="inline-flex items-center gap-x-1 rounded-full bg-secondary px-4 py-1 text-primary shadow-sm">
				<HugeiconsIcon size={16} icon={CheckmarkBadge02Icon} strokeWidth={2} />
				<span className="text-[11px] font-bold tracking-wider uppercase">
					Circuito Oficial FICAV • 100% Blindado Anti-Sal
				</span>
			</div>

			<div className="flex items-center justify-center gap-x-3">
				<div className="relative flex size-12 items-center justify-center rounded-xl bg-secondary shadow-xl">
					<img
						src="/favicon.svg"
						alt="TurboSnail BET"
						className="size-8"
					/>
					<div className="absolute -right-1 -bottom-1 size-3">
						<span className="absolute size-full animate-ping rounded-full bg-primary opacity-75" />
						<span className="flex size-full rounded-full bg-primary" />
					</div>
				</div>

				<div className="flex items-baseline">
					<span className="font-sans text-4xl font-bold tracking-tighter text-foreground">
						TURBO<span className="text-primary">SNAIL</span>
					</span>
					<span className="ml-2 rounded-md bg-primary px-2.5 py-0.5 font-sans text-sm font-black tracking-widest text-primary-foreground uppercase shadow-md">
						BET
					</span>
				</div>
			</div>

			<p className="max-w-md text-muted-foreground text-center">
				El sportsbook más{" "}
				<span className="font-semibold text-telemetry">
					vertiginosamente lento
				</span>{" "}
				del planeta. Telemetría de babosas y cuotas en vivo.
			</p>
		</div>
	);
}
