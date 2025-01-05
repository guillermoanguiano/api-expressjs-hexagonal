import { UserGetById } from '../../User/application/UserGetById/UserGetById';
import { InMemoryUserRepository } from "../../User/infrastructure/InMemoryUserRepository";
import { UserGetAll } from '../../User/application/UserGetAll/UserGetAll';
import { UserCreate } from '../../User/application/UserCreate/UserCreate';
import { UserEdit } from '../../User/application/UserEdit/UserEdit';
import { UserDelete } from '../../User/application/UserDelete/UserDelete';

const userRepository = new InMemoryUserRepository();

export const ServiceContainer = {
    user: {
        create: new UserCreate(userRepository),
        getAll: new UserGetAll(userRepository),
        getById: new UserGetById(userRepository),
        edit: new UserEdit(userRepository),
        delete: new UserDelete(userRepository)
    }
}