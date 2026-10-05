import type { Request, Response } from "express";
import { HTTP_STATUS_CODE } from "@common/constants";
import type { AppService } from "./app.service";

export class AppController {
	constructor(private readonly service: AppService) {}

	topUp = (req: Request, res: Response) => {
		const response = this.service.topUp(req.body);
		return res.status(HTTP_STATUS_CODE.OK).json(response);
	};
}
