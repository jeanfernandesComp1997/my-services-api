import { User } from "../entities/User";

export interface IUserRepository {
    findAll(): Promise<Array<User>>;
    saveUser(user): Promise<User>;
    userExist(email: string): Promise<User>;
}