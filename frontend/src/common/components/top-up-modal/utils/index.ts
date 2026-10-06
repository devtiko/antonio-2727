import { TransactionStatusDetail } from "@/common/types";
import type { Transaction } from "@/common/types";

export const AMOUNTS = [25, 50, 100, 250];

export function getStatusMessage(data: Transaction) {
	switch (data?.status_detail) {
		case TransactionStatusDetail.ACCREDITED_PAYMENT:
			return {
				title: "¡Recarga Exitosa!",
				description: `Se acreditaron $${data?.transaction_amount.toFixed(2)} MXN a tu cuenta vía SnailPay`,
			};
		case TransactionStatusDetail.EXPIRED_CARD:
			return {
				title: "Tarjeta Vencida",
				description: "Verifica los datos ingresados e intenta de nuevo.",
			};
		case TransactionStatusDetail.DECLINED_CARD:
			return {
				title: "Tarjeta Rechazada",
				description: "El banco rechazó la tarjeta. Intenta con otra tarjeta.",
			};
		case TransactionStatusDetail.CARD_VERIFICATION_FAILED:
			return {
				title: "Verificación Fallida",
				description:
					"El banco no pudo verificar la tarjeta. Verifica los datos ingresados.",
			};
		default:
			return {
				title: "Pago Rechazado",
				description: "No se pudo procesar la recarga. Inténtalo de nuevo.",
			};
	}
}

export function formatCardNumber(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 16);
	return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function formatExpiry(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 4);
	if (digits.length <= 2) return digits;
	return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}
