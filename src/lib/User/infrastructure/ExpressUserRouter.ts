import { Router } from "express";
import { ExpressUserController } from "./ExpressUserController";

const controller = new ExpressUserController();

const ExpressUserRouter = Router();

ExpressUserRouter.get("/user/", controller.getAll);
ExpressUserRouter.get("/user/:id/", controller.getById);
ExpressUserRouter.post("/user/", controller.create);
ExpressUserRouter.put("/user/", controller.edit);
ExpressUserRouter.delete("/user/:id", controller.delete);

export { ExpressUserRouter };