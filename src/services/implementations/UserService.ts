import { User } from './../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserService } from './../IUserService';

export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository,
    ) { }

    async addUser(obj: any): Promise<User> {
        const user = new User(obj);

        if (await this.userRepository.userExist(user.email))
            throw new Error('Email already in use!');

        if (user._errors.length > 0)
            throw new Error(user._errors.toString());

        delete user._errors;

        try {
            return await this.userRepository.saveUser(user);
        } catch (error) {
            throw error;
        }
    }
}