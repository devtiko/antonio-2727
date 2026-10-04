import { useState } from "react";
import { toast } from "sonner";
import { ApiService } from "@/services/api";
import type { LoginInput } from "@/services/api/types";
import { useAuthContext } from "@/common/context/AuthContext";
import { useNavigate } from "react-router";

export const useLogin = () => {
	const navigate = useNavigate();
	const { updateUser } = useAuthContext();
	const [showPassword, setShowPassword] = useState(false);
	const [isPendingLogin, setIsPedingLogin] = useState(false);

	const handleLogin = async (data: LoginInput) => {
		try {
			setIsPedingLogin(true);
			const { user } = await ApiService.login(data);
			toast.success("¡Acelerador activado!", {
				description: `Bienvenido de nuevo, ${user?.first_name}.`,
			});
			updateUser(user);
			navigate("/dashboard", { replace: true });
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
