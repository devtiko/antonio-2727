import http from "node:http";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { HTTP_STATUS_CODE } from "@common/constants";
import { errorHandler } from "@common/middlewares";
import { rateLimiter } from "@security/limiters";
import { apiKeyGuard } from "@security/guards";
import { ENV } from "@config/env";
import { router } from "@app/app.routes";

export class HttpServer {
	private readonly app: express.Express;
	private server?: http.Server;

	constructor() {
		this.app = express();

		this.app.use(helmet());
		this.app.use(cors({ origin: ENV.CORS_ORIGIN }));
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(rateLimiter);

		this.app.use("/api/v1", apiKeyGuard, router);

		this.app.use((_req, res) =>
			res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
				code: "not_found",
				message: "Not Found",
			}),
		);

		this.app.use(errorHandler);
	}

	start(): void {
		this.server = this.app.listen(ENV.PORT, () => {
			console.log(`Server started`);
		});
	}

	stop(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.server) return resolve();
			this.server.close((err) => {
				if (err) {
					reject(err);
				} else {
					console.log("Server stopped");
					resolve();
				}
			});
		});
	}
}
