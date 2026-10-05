import { Router } from "express";
import { validate } from "@common/middlewares";
import { topUpDto } from "./dto";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

export const router = Router();

const service = new AppService();
const controller = new AppController(service);

router.post("/top-up", validate(topUpDto), controller.topUp);
