import { RepositoryExceptions } from './../exceptions/RepositoryException';
import { UserAddressDTO } from '../../dto/userDtos/UserAddressDTO';
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
            throw new RepositoryExceptions(error);
        }
    }

    async userExist(email: string): Promise<User> {
        try {
            const result = await this.dbContext('user').where('email', email);

            return result.length > 0 ? new User(result[0]) : null;
        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }

    async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
        try {
            const result = await this.dbContext('user').where('email', email).where('password', password);

            return result.length > 0 ? new User(result[0]) : null;
        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }

    async updatePasswordResetToken(email: string, token: string, expiresIn: Date): Promise<void> {
        try {
            await this.dbContext('user').where('email', email)
                .update({
                    passwordResetToken: token,
                    passwordResetExpires: expiresIn
                });

        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }

    async updatePassword(email: string, password: string): Promise<void> {
        try {
            await this.dbContext('user').where('email', email)
                .update({
                    password: password
                });

        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }

    async saveAddress(address: Address): Promise<Address> {
        try {
            await this.dbContext.insert(address).into('address');

            return new Address(address);
        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }

    async findAll(): Promise<Array<UserAddressDTO>> {
        try {
            const result = await this.dbContext.from('user').leftJoin('address', 'user.id', 'address.userId');

            return result.map(user => new UserAddressDTO(user));
        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }
}