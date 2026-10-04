export const HeaderLogo = () => {
	return (
		<div className="flex items-center gap-x-2">
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
			<span className="hidden font-serif text-base font-bold tracking-tight text-emphasis xl:inline-block">
				TurboSnail<span className="ml-1 text-primary">BET</span>
			</span>
		</div>
	);
};
