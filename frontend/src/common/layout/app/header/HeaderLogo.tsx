export const HeaderLogo = () => {
	return (
		<div className="flex items-center gap-x-2">
			<img src="/favicon.svg" alt="TurboSnail BET" className="size-8" />
			<span className="hidden font-serif text-base font-bold tracking-tight text-emphasis xl:inline-block">
				TurboSnail<span className="ml-1 text-primary">BET</span>
			</span>
		</div>
	);
};
