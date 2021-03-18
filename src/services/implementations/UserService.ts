import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Address } from './../../entities/Address';
import { User } from './../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserService } from './../IUserService';
import { IMailProvider } from '../../providers/IMailProvider';
import 'dotenv/config'

export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
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

    async forgotPassword(email: string): Promise<any> {
        const user = await this.userRepository.userExist(email);

        if (!user)
            throw new Error('Invalid user email!');

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        try {
            await this.userRepository.updatePasswordResetToken(user.email, token, now);
        } catch (error) {
            throw error;
        }

        await this.mailProvider.sendMail({
            to: {
                name: 'MyServiceAPI',
                email: 'noreply@myservice.com',
            },
            from: {
                name: user.name,
                email: user.email,
            },
            subject: 'Recuperação de senha',
            body: `<p>Olá, use o seguinte token para alterar sua senha: ${token}</p>`
        });

        return {
            success: true,
            message: `Email successfully sent to ${user.email}`
        };
    }

    async resetPassword(email: string, password: string, token: string): Promise<any> {
        const user = await this.userRepository.userExist(email);

        if (!user)
            throw new Error('Invalid user email!');

        const now = new Date();

        if (user.passwordResetToken === token && now < new Date(user.passwordResetExpires)) {
            await this.userRepository.updatePassword(user.email, password);
            await this.userRepository.updatePasswordResetToken(user.email, null, null);
        }
        else
            throw new Error('Invalid Token!');

        return {
            success: true,
            message: `Password changed successfully!`
        };
    }
}