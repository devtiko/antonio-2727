import { Router } from "express";
import { validate } from "@common/middlewares";
import { topUpDto } from "./dto";
import { AppRepository } from "./app.repository";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DATABASE } from "./mock";

export const router = Router();

const repository = new AppRepository(DATABASE);
const service = new AppService(repository);
const controller = new AppController(service);

router.post("/top-up", validate(topUpDto), controller.topUp);
