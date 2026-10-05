import { createEnv } from "valibot-env";
import * as v from "valibot";

export const ENV = createEnv({
	schema: {
		shared: {
			PORT: v.pipe(v.string(), v.toNumber(), v.integer()),
			CORS_ORIGIN: v.pipe(v.string(), v.url()),
			API_KEY: v.pipe(v.string(), v.nonEmpty()),
		},
	},
	values: process.env,
});
