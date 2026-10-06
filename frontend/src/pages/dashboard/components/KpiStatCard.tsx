import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn, type ClassValue } from "cn";

interface KpiStatCardProps {
	title: string;
	icon: IconSvgElement;
	value: string;
	prefix?: string;
	suffix?: string;
	caption?: string;
	accent?: ClassValue;
}

export function KpiStatCard({
	title,
	icon,
	value,
	prefix,
	suffix,
	caption,
	accent,
}: KpiStatCardProps) {
	return (
		<div className="flex flex-col rounded-xl bg-surface-lowest/80 p-4 backdrop-blur-md">
			<div className="flex items-center justify-between">
				<span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
					{title}
				</span>
				<HugeiconsIcon
					icon={icon}
					strokeWidth={2}
					className={cn("size-5 text-primary", accent)}
				/>
			</div>
			<div className="mt-1 flex items-baseline gap-1">
				{prefix && (
					<span className="font-serif text-3xl font-bold text-emphasis">
						{prefix}
					</span>
				)}
				<span className="font-serif text-3xl font-bold text-emphasis">
					{value}
				</span>
				{suffix && (
					<span className="text-xs text-muted-foreground">{suffix}</span>
				)}
			</div>
			{caption && (
				<span className={cn("mt-1 truncate text-xs text-primary", accent)}>
					{caption}
				</span>
			)}
		</div>
	);
}
