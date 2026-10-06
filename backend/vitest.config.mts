import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@app": path.join(import.meta.dirname, "src/app"),
			"@common": path.join(import.meta.dirname, "src/common"),
			"@config": path.join(import.meta.dirname, "src/config"),
			"@security": path.join(import.meta.dirname, "src/security"),
			"@server": path.join(import.meta.dirname, "src/server"),
		},
	},
	test: {
		include: ["src/**/__test__/**/*.test.ts"],
	},
});
