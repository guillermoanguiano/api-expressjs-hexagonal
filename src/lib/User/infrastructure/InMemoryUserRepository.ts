import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserRepository } from '../domain/UserRepository';

export class InMemoryUserRepository implements UserRepository {

    private users: User[] = [{
        id: new UserId('1'),
        name: new UserName('John Doe'),
        email: new UserEmail('pZmDx@example.com')
    }];

    async create(user: User): Promise<void> {
        this.users.push(user);
    }

    async getAll(): Promise<User[]> {
        return this.users;
    }

    async getById(id: UserId): Promise<User | null> {
        return this.users.find(user => user.id.value === id.value) || null;
    }

    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.id.value === user.id.value);
        this.users[index] = user;
    }

    async delete(id: UserId): Promise<void> {
        this.users = this.users.filter(user => user.id.value !== id.value);
    }
}