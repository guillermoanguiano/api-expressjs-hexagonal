import { User } from "../../domain/User";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";

export class UserEdit {
    constructor(private repository: UserRepository) { }

    async execute(id: string, name: string, email: string): Promise<void> {
        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email)
        );

        const userExists = await this.repository.getById(user.id);

        if (!userExists) throw new UserNotFoundError("User not found");

        await this.repository.update(user)
    }
} 