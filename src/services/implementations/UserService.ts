import * as jwt from 'jsonwebtoken';
import { Address } from './../../entities/Address';
import { User } from './../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserService } from './../IUserService';
require('dotenv').config();

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

    async login(credentials: any): Promise<any> {
        const { email, password } = credentials;

        if (!email || !password)
            throw new Error('Email and Password are required.');

        if (!await this.userRepository.userExist(email))
            throw new Error('Sorry, this email is invalid.');

        const user = await this.userRepository.getUserByEmailAndPassword(email, password);

        if (user && user.password === password) {
            const accesToken = await jwt.sign({ email: user.email }, process.env.SECRET, {
                expiresIn: 43200
            });

            return {
                token: accesToken,
                expiresIn: "43200 ms"
            };
        }
        else
            throw new Error('Incorrect password!');
    }

    async addAddress(obj: any): Promise<Address> {
        const address = new Address(obj);

        if (await this.userRepository.userExist(address.userId))
            throw new Error('UserId invalid invalid!');

        if (address._errors.length > 0)
            throw new Error(address._errors.toString());

        delete address._errors;

        try {
            return await this.userRepository.saveAddress(address);
        } catch (error) {
            throw error;
        }
    }
}