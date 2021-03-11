import { User } from './../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserService } from './../IUserService';

export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async addUser(obj: any): Promise<User> {
        const user = new User(obj);
        user.validate();

        try {
            return await this.userRepository.saveUser(user);
        } catch (error) {
            throw error;
        }
    }
}