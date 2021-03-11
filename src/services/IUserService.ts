import { User } from './../entities/User';

export interface IUserService {
    addUser(user: User): Promise<User>;
}