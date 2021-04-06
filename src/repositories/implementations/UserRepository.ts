import { UserDTO } from './../../dto/userDtos/UserDTO';
import { AddressDTO } from './../../dto/userDtos/AddressDTO';
import { RepositoryExceptions } from './../exceptions/RepositoryException';
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

            return result.length > 0 ? User.createUser(result[0]).getValue() : null;
        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }

    async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
        try {
            const result = await this.dbContext('user').where('email', email).where('password', password);

            return result.length > 0 ? User.createUser(result[0]).getValue() : null;
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

            return address;
        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }

    async findAll(): Promise<Array<UserDTO>> {
        try {
            const result = await this.dbContext.select(['user.*', 'address.*', 'user.id as userId'])
                .table('user')
                .leftJoin('address', 'user.id', 'address.userId');

            //return result.map(user => new UserAddressDTO(user));

            const users = result.reduce((newArr, current, index, original) => {
                if (newArr[current.userId]) {
                    newArr[current.userId].address.push(new AddressDTO(current));
                    return { ...newArr };
                }

                return { ...newArr, [current.userId]: new UserDTO(current) };
            }, {});

            return Object.values(users);
        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }
}