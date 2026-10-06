import "http";

declare module "http" {
	interface IncomingHttpHeaders {
		"x-api-key"?: string;
	}
}
