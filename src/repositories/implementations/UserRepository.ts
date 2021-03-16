import { UserAddressDTO } from '../../DTOS/userDtos/UserAddressDTO';
import { Knex } from 'knex';
import { Address } from '../../entities/Address';
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

    async findAll(): Promise<Array<UserAddressDTO>> {
        try {
            const result = await this.dbContext.from('user').innerJoin('address', 'user.id', 'address.userId');

            return result.map(user => new UserAddressDTO(user));
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

    async saveAddress(address: Address): Promise<Address> {
        try {
            await this.dbContext.insert(address).into('address');

            return address;
        } catch (error) {
            throw error;
        }
    }
}