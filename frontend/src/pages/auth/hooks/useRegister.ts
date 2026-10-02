import { useState } from "react";
import { toast } from "sonner";
import { ApiService } from "@/services/api";
import { useNavigate } from "react-router";
import type { RegisterInput } from "@/services/api/types";

export const useRegister = () => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isPendingRegister, setIsPendingRegister] = useState(false);

	const handleRegister = async (data: RegisterInput) => {
		try {
			setIsPendingRegister(true);
			const user = await ApiService.register(data);
			toast.success(
				`¡Bienvenido a la pista, ${user?.first_name || "Corredor"}!`,
				{
					description: "Tu cuenta ha sido creada con éxito.",
				},
			);
			navigate("/dashboard", { replace: true });
		} catch (e: unknown) {
			const isKnowError = e instanceof Error;
			toast.error(isKnowError ? "Error al crear tu cuenta" : "Algo salió mal", {
				description: isKnowError ? e.message : "Inténtalo de nuevo más tarde.",
			});
		} finally {
			setIsPendingRegister(false);
		}
	};

	const togglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const toggleConfirmPassword = () => {
		setShowConfirmPassword((prev) => !prev);
	};

	return {
		isPendingRegister,
		handleRegister,
		showPassword,
		showConfirmPassword,
		togglePassword,
		toggleConfirmPassword,
	};
};
