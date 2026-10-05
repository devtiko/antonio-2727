import { HttpServer } from "@server/http-server";

const server = new HttpServer();

function main() {
	server.start();

	const shutdown = async () => {
		await server.stop();
		process.exit(0);
	};

	process.once("SIGINT", shutdown);
	process.once("SIGTERM", shutdown);
}

main();
