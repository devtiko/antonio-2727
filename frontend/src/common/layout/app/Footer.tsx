import { HugeiconsIcon } from "@hugeicons/react";
import { Shield02Icon } from "@hugeicons/core-free-icons";

export function AppFooter() {
	return (
		<footer className="w-full bg-surface-lowest px-4 py-8">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
				<div className="flex items-center gap-x-3">
					<HugeiconsIcon
						size={6}
						strokeWidth={2}
						icon={Shield02Icon}
						className="size-6 text-primary"
					/>
					<div className="flex flex-col">
						<span className="font-serif text-xs font-bold text-emphasis">
							Juego Responsable
						</span>
						<span className="text-xs text-muted-foreground">
							Lento pero Seguro • Mayores de 18 años
						</span>
					</div>
				</div>
				<span className="text-center text-xs text-muted-foreground md:text-right">
					Licencia Oficial de la Federación Internacional de Caracoles Velces
					(FICAV) #TURBO-774-SLO
				</span>
			</div>
		</footer>
	);
}
