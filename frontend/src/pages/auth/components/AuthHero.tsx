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
					<svg
						aria-hidden="true"
						className="size-8 text-primary"
						fill="none"
						viewBox="0 0 100 100"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15 72C35 72 75 72 88 72C94 72 96 66 90 62C82 56 68 56 60 56"
							stroke="var(--telemetry)"
							strokeLinecap="round"
							strokeWidth="6"
						/>
						<circle
							cx="48"
							cy="46"
							fill="var(--card)"
							r="28"
							stroke="currentColor"
							strokeWidth="6"
						/>
						<path
							d="M48 30C56 30 62 36 62 44C62 52 54 58 46 58C40 58 36 54 36 48C36 43 40 40 44 40"
							stroke="var(--telemetry)"
							strokeLinecap="round"
							strokeWidth="4"
						/>
						<path
							d="M66 26L74 16M60 22L64 12"
							stroke="currentColor"
							strokeLinecap="round"
							strokeWidth="4"
						/>
						<circle cx="75" cy="15" fill="currentColor" r="2.5" />
						<circle cx="65" cy="11" fill="currentColor" r="2.5" />
					</svg>
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
