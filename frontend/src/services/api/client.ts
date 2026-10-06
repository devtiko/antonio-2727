import axios from "axios";
import { ENV } from "@/config/env";

export const apiClient = axios.create({
	baseURL: ENV.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
	config.headers.set("x-api-key", ENV.VITE_API_KEY);
	return config;
});
