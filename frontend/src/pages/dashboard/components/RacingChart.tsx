import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	Rectangle,
	XAxis,
	YAxis,
} from "recharts";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/common/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/common/ui/chart";
import { RANK_COLOR, SNAIL_PODIUM, type SnailPodiumRow } from "../mock";
import { RacingTimeline } from "./RacingTimeline";

function formatLabel(wins: number, percent: number): string {
	const word = wins === 1 ? "Victoria" : "Victorias";
	return `${wins} ${word} (${percent}%)`;
}

export function RacingChart() {
	return (
		<Card className="flex flex-col justify-between shadow-lg ring-0 lg:col-span-7">
			<CardHeader>
				<CardTitle className="font-serif text-xl font-semibold tracking-tight text-emphasis">
					Palmarés del Día por Gastrópodo
				</CardTitle>
				<CardDescription className="text-xs text-muted-foreground">
					Rendimiento en pista según sensor de fotollegada FICAV de hoy.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<ChartContainer config={{}} className="h-72 w-full">
					<BarChart
						data={SNAIL_PODIUM}
						layout="vertical"
						margin={{ right: 32 }}
					>
						<CartesianGrid horizontal={false} strokeDasharray="3 3" />
						<XAxis
							type="number"
							domain={[0, 60]}
							tickFormatter={(value) => `${value}%`}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							type="category"
							dataKey="rank"
							tickFormatter={(value) => `#${value}`}
							tickLine={false}
							axisLine={false}
							width={44}
						/>
						<ChartTooltip
							cursor={{ fill: "var(--muted)" }}
							content={
								<ChartTooltipContent
									hideLabel
									indicator="line"
									formatter={(_, __, item) => {
										const row = item.payload as SnailPodiumRow;
										return (
											<span className="text-muted-foreground">
												{formatLabel(row.wins, row.percent)}
											</span>
										);
									}}
								/>
							}
						/>
						<Bar
							radius={6}
							dataKey="percent"
							shape={(props) => {
								const row = props.payload as SnailPodiumRow;
								const fill =
									row.wins > 0
										? (RANK_COLOR[row.rank] ?? "var(--muted)")
										: "var(--destructive)";
								return (
									<Rectangle
										x={props.x}
										y={props.y}
										width={props.width}
										height={props.height}
										radius={props.radius}
										fill={fill}
									/>
								);
							}}
						>
							<LabelList
								dataKey="name"
								position="right"
								className="fill-emphasis"
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
				<RacingTimeline />
			</CardContent>
		</Card>
	);
}
