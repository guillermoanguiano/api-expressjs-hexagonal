import { Pool } from "pg";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserName } from "../domain/UserName";
import { UserEmail } from "../domain/UserEmail";

type PostgresUser = {
    id: string,
    name: string,
    email: string
}

export class PostgresUserRepository implements UserRepository {
    client: Pool

    constructor(databaseUrl: string) {
        this.client = new Pool({
            connectionString: databaseUrl
        })
    }

    private mapUserToDomain(user: PostgresUser): User {
        return new User(
            new UserId(user.id),
            new UserName(user.name),
            new UserEmail(user.email)
        )
    }

    async create(user: User): Promise<void> {
        const query = {
            text: "INSERT INTO users (id, name, email) VALUES ($1, $2, $3)",
            values: [user.id.value, user.name.value, user.email.value]
        };

        await this.client.query(query);
    }

    async getAll(): Promise<User[]> {
        const query = {
            text: "SELECT id, name, email FROM users"
        };

        const result = await this.client.query<PostgresUser>(query);

        return result.rows.map(user => this.mapUserToDomain(user));
    }

    async getById(id: UserId): Promise<User | null> {
        const query = {
            text: "SELECT id, name, email FROM users WHERE id = $1",
            values: [id.value]
        };

        const result = await this.client.query<PostgresUser>(query);

        if (result.rows.length === 0) return null;

        const user = result.rows[0];

        return this.mapUserToDomain(user);
    }

    async update(user: User): Promise<void> {
        const query = {
            text: "UPDATE users SET name = $1, email = $2 WHERE id = $3",
            values: [user.name.value, user.email.value, user.id.value]
        };

        await this.client.query(query);

    }

    async delete(id: UserId): Promise<void> {
        const query = {
            text: "DELETE FROM users WHERE id = $1",
            values: [id.value]
        };

        await this.client.query(query);
    }

}