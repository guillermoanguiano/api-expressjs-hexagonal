import { Request, Response } from "express";
import { ServiceContainer } from "../../Shared/Infrastructure/ServiceContainer";
import { UserNotFoundError } from "../domain/UserNotFoundError";

export class ExpressUserController {
    async create(req: Request, res: Response) {
        const { id, name, email } = req.body as {
            id: string,
            name: string,
            email: string
        };
        await ServiceContainer.user.create.execute(id, name, email);
    }

    async getAll(req: Request, res: Response) {
        const users = await ServiceContainer.user.getAll.execute();

        res.json(users).status(200);
    }

    async getById(req: Request, res: Response) {
        try {
            const user = await ServiceContainer.user.getById.execute(req.params.id);
            res.json(user).status(200);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
        }
    }

    async edit(req: Request, res: Response) {
        const { id, name, email } = req.body as {
            id: string,
            name: string,
            email: string
        };

        await ServiceContainer.user.edit.execute(id, name, email);
    }

    async delete(req: Request, res: Response) {
        await ServiceContainer.user.delete.execute(req.params.id);
    }
}