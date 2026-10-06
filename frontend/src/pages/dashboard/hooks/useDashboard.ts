import { toast } from "sonner";
import { useState } from "react";
import { RUNNERS, type Runner } from "../mock";
import { useAuthContext } from "@/common/context/AuthContext";
import type { TicketInput } from "@/services/api/types";

export const useDashboard = () => {
	const { user } = useAuthContext();
	const [runner, setRunner] = useState<Runner | null>(RUNNERS[0]);

	const handleSelectRunner = (data: Runner) => {
		if (data?.lane !== runner?.lane) {
			setRunner(data);
			toast.success("Caracol Elegido", {
				description: `${data?.name} con cuota de ${data?.odds?.toFixed(2)}x`,
			});
		}
	};

	const handlePlaceBet = ({ amount }: TicketInput) => {
		const canBet = amount > (user?.balance || 0);
		if (canBet) {
			toast.error("Saldo Insuficiente", {
				description: "Por favor recarga con SnailPay para realizar esta jugada",
			});
		} else {
			toast.success("¡Apuesta Confirmada!", {
				description: `Has apostado $${amount.toFixed(2)} MXN a ${runner?.name}`,
			});
		}
	};

	// toast.success("¡Recarga Exitosa!", {
	// 	description: `Se acreditaron $${amount.toFixed(2)} MXN a tu cuenta vía SnailPay ⚡`,
	// });

	return {
		runner,
		handlePlaceBet,
		handleSelectRunner,
	};
};
