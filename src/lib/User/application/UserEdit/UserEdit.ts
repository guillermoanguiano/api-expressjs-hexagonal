import { User } from "../../domain/User";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserRepository } from "../../domain/UserRepository";

export class UserEdit {
    constructor(private repository: UserRepository) { }

    async execute(id: string, name: string, email: string): Promise<void> {
        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email)
        );

        await this.repository.update(user)
    }
} 