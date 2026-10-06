import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Notification01Icon } from "@hugeicons/core-free-icons";
import { Button } from "../../../ui/button";
import { UserMenu } from "./UserMenu";
import { HeaderLogo } from "./HeaderLogo";

interface HeaderProps {
	showTopUp: () => void;
}

export function Header({ showTopUp }: HeaderProps) {
	return (
		<header className="fixed top-0 left-0 right-0 h-20 z-50 px-4 bg-surface-lowest/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
			<div className="flex h-full items-center justify-between gap-x-4">
				<HeaderLogo />
				<div className="flex items-center gap-x-4">
					<Button
						size="lg"
						onClick={showTopUp}
						className="rounded-full font-bold shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_30%,transparent)]"
					>
						<HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
						Recargar
					</Button>
					<Button
						size="icon-lg"
						variant="secondary"
						className="relative rounded-xl"
					>
						<HugeiconsIcon strokeWidth={2} icon={Notification01Icon} />
						<span className="absolute top-1 right-1 size-2.5 rounded-full bg-primary ring-surface-lowest" />
					</Button>
					<UserMenu />
				</div>
			</div>
		</header>
	);
}
