import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserRepository } from "../../domain/UserRepository";
import { UserNotFoundError } from "../../domain/UserNotFoundError";

export class UserGetById {
    constructor(private repository: UserRepository) { }

    async execute(id: string): Promise<User> {
        const user = await this.repository.getById(new UserId(id));

        if (!user) throw new UserNotFoundError("User not found");

        return user;
    }
}