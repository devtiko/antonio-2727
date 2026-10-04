export interface Runner {
	lane: number;
	name: string;
	weight: number;
	form: number[];
	odds: number;
}

export const RUNNERS: Runner[] = [
	{
		lane: 1,
		name: "Turbo Baba",
		weight: 24,
		form: [1, 1, 2, 1, 1, 2],
		odds: 1.65,
	},
	{
		lane: 2,
		name: "Don Espiral",
		weight: 22,
		form: [2, 1, 3, 2, 1, 3],
		odds: 3.2,
	},
	{
		lane: 3,
		name: "Caparazón Express",
		weight: 19,
		form: [4, 3, 1, 4, 2, 1],
		odds: 4.5,
	},
	{
		lane: 4,
		name: "Señor Desliz",
		weight: 27,
		form: [3, 4, 1, 3, 4, 2],
		odds: 5,
	},
	{
		lane: 5,
		name: "Rayo Lento",
		weight: 31,
		form: [5, 5, 4, 5, 6, 5],
		odds: 12,
	},
	{
		lane: 6,
		name: "Relámpago Verde",
		weight: 20,
		form: [6, 6, 5, 6, 5, 6],
		odds: 18,
	},
];

export interface SnailPodiumRow {
	rank: number;
	name: string;
	wins: number;
	percent: number;
}

export const SNAIL_PODIUM: SnailPodiumRow[] = [
	{
		rank: 1,
		name: "Turbo Baba",
		wins: 3,
		percent: 50,
	},
	{
		rank: 2,
		name: "Don Espiral",
		wins: 1,
		percent: 16.7,
	},
	{
		rank: 3,
		name: "Señor Desliz",
		wins: 1,
		percent: 16.7,
	},
	{
		rank: 4,
		name: "Caparazón Express",
		wins: 1,
		percent: 16.7,
	},
	{
		rank: 5,
		name: "Rayo Lento",
		wins: 0,
		percent: 0,
	},
	{
		rank: 6,
		name: "Relámpago Verde",
		wins: 0,
		percent: 0,
	},
];

export const RANK_COLOR: Record<number, string> = {
	1: "var(--chart-1)",
	2: "var(--chart-2)",
	3: "var(--chart-3)",
	4: "var(--chart-4)",
	5: "var(--chart-5)",
};

export interface RaceTimelineEntry {
	code: string;
	winner: string;
	time: string;
}

export const RACE_TIMELINE: RaceTimelineEntry[] = [
	{ code: "C1", winner: "Turbo Baba", time: "14m 22s" },
	{ code: "C2", winner: "Don Espiral", time: "16m 04s" },
	{ code: "C3", winner: "Turbo Baba", time: "13m 50s" },
	{ code: "C4", winner: "Señor Desliz", time: "17m 10s" },
	{ code: "C5", winner: "Caparazón Ex.", time: "15m 33s" },
	{ code: "C6", winner: "Turbo Baba", time: "14m 05s" },
];

export const DONUT_STATS = {
	total: 30,
	wins: 18,
	losses: 12,
	winsPct: 60,
	lossesPct: 40,
};

export const RACE_TICKET_AMOUNTS = [10, 25, 50];
export const SNAIL_PAY_AMOUNTS = [20, 50, 100, 250];

export interface KpiStats {
	gain: number;
	roi: number;
	active_bets: number;
	next_race_time: string;
	races: {
		total: number;
		completed: number;
	};
}

export const KPI_STATS: KpiStats = {
	gain: 340.5,
	roi: 28.4,
	active_bets: 2,
	next_race_time: "10:30",
	races: { total: 6, completed: 6 },
};
