import { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../domain/UserNotFoundError";
//@ts-ignore
import { ServiceContainer } from "../../Shared/Infrastructure/ServiceContainer";


export class ExpressUserController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, name, email } = req.body as {
                id: string,
                name: string,
                email: string
            };
            await ServiceContainer.user.create.execute(id, name, email);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const users = await ServiceContainer.user.getAll.execute();

            return res.json(users).status(200);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const user = await ServiceContainer.user.getById.execute(req.params.id);

            return res.json(user).status(200);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }

            next(error);
        }
    }

    async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, name, email } = req.body as {
                id: string,
                name: string,
                email: string
            };

            await ServiceContainer.user.edit.execute(id, name, email);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await ServiceContainer.user.delete.execute(req.params.id);
        } catch (error) {
            next(error);
        }
    }
}