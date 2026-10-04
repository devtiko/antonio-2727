import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RUNNERS, type Runner } from "../mock";

const INITIAL_BALANCE = 1250;
const INITIAL_COUNTDOWN = 265;

export interface DashboardContext {
	balance: number;
	selectedRunner: Runner;
	stake: number;
	totalReturn: number;
	profit: number;
	countdown: string;
	cardTopUpOpen: boolean;
	processingTopUp: boolean;
	setStake: (value: number) => void;
	selectRunner: (runner: Runner) => void;
	placeBet: () => void;
	setCardTopUpOpen: (open: boolean) => void;
	confirmCardTopUp: (amount: number) => void;
	logout: () => void;
}

function formatCountdown(totalSeconds: number): string {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function useDashboard(): DashboardContext {
	const [balance, setBalance] = useState(INITIAL_BALANCE);
	const [selectedRunner, setSelectedRunner] = useState<Runner>(RUNNERS[0]);
	const [stake, setStake] = useState(25);
	const [countdownSeconds, setCountdownSeconds] = useState(INITIAL_COUNTDOWN);
	const [cardTopUpOpen, setCardTopUpOpen] = useState(false);
	const [processingTopUp, setProcessingTopUp] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdownSeconds((value) => (value > 0 ? value - 1 : value));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const selectRunner = (runner: Runner) => {
		setSelectedRunner(runner);
		toast.success("Caracol Elegido", {
			description: `${runner.name} agregado al talón con cuota de ${runner.odds.toFixed(2)}x`,
		});
	};

	const placeBet = () => {
		if (stake > balance) {
			toast.error("Saldo Insuficiente", {
				description: "Por favor recarga con SnailPay para realizar esta jugada",
			});
			return;
		}
		setBalance((current) => current - stake);
		toast.success("¡Apuesta Confirmada!", {
			description: `Has apostado $${stake.toFixed(2)} MXN a ${selectedRunner.name}`,
		});
	};

	const confirmTopUp = (amount: number) => {
		if (processingTopUp) return;
		setProcessingTopUp(true);
		setTimeout(() => {
			setBalance((current) => current + amount);
			setProcessingTopUp(false);
			setCardTopUpOpen(false);
			toast.success("¡Recarga Exitosa!", {
				description: `Se acreditaron $${amount.toFixed(2)} MXN a tu cuenta vía SnailPay ⚡`,
			});
		}, 1100);
	};

	const logout = () => {
		toast.info("Cierre de Sesión", {
			description:
				"Cerrando sesión de forma segura y destruyendo SecureSnail Token...",
		});
	};

	const totalReturn = stake * selectedRunner.odds;
	const profit = totalReturn - stake;

	return {
		balance,
		selectedRunner,
		stake,
		totalReturn,
		profit,
		countdown: formatCountdown(countdownSeconds),
		cardTopUpOpen,
		processingTopUp,
		setStake,
		selectRunner,
		placeBet,
		setCardTopUpOpen,
		confirmCardTopUp: confirmTopUp,
		logout,
	};
}
