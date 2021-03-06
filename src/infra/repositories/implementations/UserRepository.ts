import { Address } from './../../../domain/entities/Address';
import { RepositoryExceptions } from './../exceptions/RepositoryException';
import { Knex } from 'knex';
import { context } from '../database/DataContext';
import { IUserRepository } from './../IUserRepository';
import { User } from '../../../domain/entities/User';
import { UserDTO } from '../../../domain/dto/userDtos/UserDTO';
import { AddressDTO } from '../../../domain/dto/userDtos/AddressDTO';

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

    async userExist(email: string): Promise<User | any> {
        try {
            const result = await this.dbContext('user').where('email', email);

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

            const users = result.reduce((newArr, current) => {
                if (newArr[current.userId])
                    newArr[current.userId].address.push(new AddressDTO(current));
                else
                    newArr[current.userId] = new UserDTO(current)
            }, {});

            return Object.values(users);
        } catch (error) {
            throw new RepositoryExceptions(error);
        }
    }
}