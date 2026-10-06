import { Pie, Label, PieChart } from "recharts";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/common/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/common/ui/chart";
import { DONUT_STATS } from "../mock";

const chartData = [
	{
		outcome: "wins",
		label: "Ganadas",
		value: DONUT_STATS.wins,
		fill: "var(--color-wins)",
	},
	{
		outcome: "losses",
		label: "Perdidas",
		value: DONUT_STATS.losses,
		fill: "var(--color-losses)",
	},
];

export function BettingChart() {
	return (
		<Card className="flex flex-col justify-between shadow-lg ring-0 lg:col-span-5">
			<CardHeader>
				<CardTitle className="font-serif text-xl font-semibold tracking-tight text-emphasis">
					Efectividad de Pronósticos
				</CardTitle>
				<CardDescription className="text-xs text-muted-foreground">
					Balance acumulado de tickets liquidados en la jornada actual.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						wins: {
							label: "Ganadas",
							color: "var(--primary)",
						},
						losses: {
							label: "Perdidas",
							color: "var(--loss)",
						},
					}}
					className="mx-auto aspect-square h-64 w-64"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="outcome"
							innerRadius={50}
							startAngle={90}
							endAngle={-270}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{DONUT_STATS.total}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Apuestas
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="grid grid-cols-2 gap-2">
				<div className="flex items-center gap-3 rounded-xl bg-surface-lowest/80 p-3">
					<div className="size-3.5 rounded-full bg-primary shadow-[0_0_8px_color-mix(in_srgb,var(--primary)_80%,transparent)]" />
					<div className="flex flex-col">
						<span className="font-serif text-base font-bold text-emphasis">
							{DONUT_STATS.wins} Ganadas
						</span>
						<span className="text-xs text-muted-foreground">
							{DONUT_STATS.winsPct}% del volumen
						</span>
					</div>
				</div>
				<div className="flex items-center gap-3 rounded-xl bg-surface-lowest/80 p-3">
					<div className="size-3.5 rounded-full bg-loss shadow-[0_0_8px_color-mix(in_srgb,var(--loss)_60%,transparent)]" />
					<div className="flex flex-col">
						<span className="font-serif text-base font-bold text-emphasis">
							{DONUT_STATS.losses} Perdidas
						</span>
						<span className="text-xs text-muted-foreground">
							{DONUT_STATS.lossesPct}% del volumen
						</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
