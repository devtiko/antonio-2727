import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Button } from "../../../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Logout01Icon,
	Settings01Icon,
	UserCircle02Icon,
} from "@hugeicons/core-free-icons";
import { useAuthContext } from "@/common/context/AuthContext";

export const UserMenu = () => {
	const { user, logout } = useAuthContext();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button size="icon-lg" variant="secondary" className="rounded-xl">
						<HugeiconsIcon strokeWidth={2} icon={UserCircle02Icon} />
					</Button>
				}
			/>
			<DropdownMenuContent sideOffset={16} className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>
						<span className="block font-serif text-sm font-semibold tracking-tight text-emphasis">
							{user?.first_name} {user?.last_name}
						</span>
						{user?.email && (
							<span className="mt-0.5 block font-sans text-xs font-normal text-muted-foreground">
								{user?.email}
							</span>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<HugeiconsIcon strokeWidth={2} icon={UserCircle02Icon} />
						Mi Perfil
					</DropdownMenuItem>
					<DropdownMenuItem>
						<HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
						Ajustes
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive" onClick={logout}>
						<HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
						Cerrar sesión
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
