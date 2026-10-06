import { createEnv } from "valibot-env";
import * as v from "valibot";

export const ENV = createEnv({
	publicPrefix: "VITE_",
	schema: {
		public: {
			VITE_API_BASE_URL: v.pipe(v.string(), v.url()),
			VITE_API_KEY: v.pipe(v.string(), v.nonEmpty()),
		},
	},
	values: import.meta.env,
});
