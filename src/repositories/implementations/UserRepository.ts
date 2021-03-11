import { context } from '../database/DataContext';
import { User } from './../../entities/User';
import { IUserRepository } from './../IUserRepository';

export class UserRepository implements IUserRepository {
    async saveUser(user: User): Promise<User> {
        try {
            await context.insert(user).into('user');

            return user;
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Array<User>> {
        try {
            const result = await context.select().table('user');
            return result.map(user => new User(user));
        } catch (error) {
            throw error;
        }
    }

}