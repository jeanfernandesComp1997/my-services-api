import { Knex } from 'knex';
import { context } from '../database/DataContext';
import { User } from './../../entities/User';
import { IUserRepository } from './../IUserRepository';

export class UserRepository implements IUserRepository {
    dbContext: Knex;

    constructor(dbContext = context) {
        this.dbContext = dbContext;
    }

    async saveUser(user: User): Promise<User> {
        try {
            await this.dbContext.insert(user).into('user');

            return user;
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Array<User>> {
        try {
            const result = await this.dbContext.select().table('user');
            return result.map(user => new User(user));
        } catch (error) {
            throw error;
        }
    }

    async userExist(email: string): Promise<User> {
        try {
            const result = await this.dbContext('user').where('email', email);

            return result.length > 0 ? new User(result[0]) : null;
        } catch (error) {
            throw error;
        }
    }
}