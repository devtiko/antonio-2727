import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiService } from "@/services/api";
import { getStatusMessage } from "../utils";
import type { UUID } from "@/common/types";
import type { TopUpSchema } from "../schemas";
import type { ApiErrorMessage } from "@/services/api/types";
import type { Transaction } from "@/common/types";
import { useAuthContext } from "@/common/context/AuthContext";

interface UseTopUpParams {
	onOpenChange: (open: boolean) => void;
}

export const useTopUp = ({ onOpenChange }: UseTopUpParams) => {
	const { user, updateUser } = useAuthContext();
	const [isPendingTopUp, setIsPendingTopUp] = useState(false);

	const handleTopUpSuccess = (data: Transaction) => {
		const { title, description } = getStatusMessage(data);
		toast.success(title, { description });

		const newBalance = (user?.balance || 0) + data?.transaction_amount;

		ApiService.saveTransaction(data);
		ApiService.updateUser(data?.payer_id, { balance: newBalance });

		onOpenChange?.(false);
		setTimeout(() => {
			updateUser({ balance: newBalance });
			setIsPendingTopUp(false);
		}, 1000);
	};

	const handleTopUpError = (
		error: AxiosError<ApiErrorMessage<Transaction>>,
	) => {
		const { data } = error?.response?.data ?? {};
		if (data) {
			const { title, description } = getStatusMessage(data);
			toast.error(title, { description });
			ApiService.saveTransaction(data);
		}
	};

	const handleTopUp = async (data: TopUpSchema) => {
		try {
			setIsPendingTopUp(true);
			const response = await ApiService.topUp({
				...data,
				user_id: user?.id as UUID,
				user_email: user?.email as string,
			});
			handleTopUpSuccess(response?.data);
		} catch (e: unknown) {
			if (e instanceof AxiosError) {
				handleTopUpError(e);
			}
			setIsPendingTopUp(false);
		}
	};

	return {
		handleTopUp,
		isPendingTopUp,
	};
};
