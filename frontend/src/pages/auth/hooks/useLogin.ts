import { useState } from "react";
import { toast } from "sonner";
import { ApiService } from "@/services/api";
import type { LoginInput } from "@/services/api/types";

export const useLogin = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isPendingLogin, setIsPedingLogin] = useState(false);

	const handleLogin = async (data: LoginInput) => {
		try {
			setIsPedingLogin(true);
			const response = await ApiService.login(data);
			const { user } = response;
			toast.success("¡Acelerador activado!", {
				description: `Bienvenido de nuevo, ${user?.first_name}.`,
			});
		} catch (e: unknown) {
			const isKnowError = e instanceof Error;
			toast.error(isKnowError ? "Error al iniciar sesión" : "Algo salió mal", {
				description: isKnowError ? e?.message : "Inténtalo de nuevo más tarde.",
			});
		} finally {
			setIsPedingLogin(false);
		}
	};

	const togglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	return {
		isPendingLogin,
		handleLogin,
		showPassword,
		togglePassword,
	};
};
