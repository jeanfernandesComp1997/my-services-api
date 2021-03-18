import { GenericServiceResponse } from './../responses/GenericServiceResponse';
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

    async addUser(obj: any): Promise<GenericServiceResponse> {
        const user = new User(obj);

        if (await this.userRepository.userExist(user.email))
            return new GenericServiceResponse(false, 'Email already in use!', null);

        if (user._errors.length > 0)
            return new GenericServiceResponse(false, user._errors.toString(), null);

        delete user._errors;

        try {
            const result = await this.userRepository.saveUser(user);
            return new GenericServiceResponse(true, 'User successfully created', result);
        } catch (error) {
            return new GenericServiceResponse(false, 'Error creating user', null);
        }
    }

    async login(credentials: any): Promise<GenericServiceResponse> {
        const { email, password } = credentials;

        if (!email || !password)
            return new GenericServiceResponse(false, 'Email and Password are required.', null);

        const user = await this.userRepository.userExist(email);

        if (!user)
            return new GenericServiceResponse(false, 'Sorry, this email is invalid.', null);

        if (user && user.password === password) {
            const accesToken = await jwt.sign({ email: user.email }, process.env.SECRET, {
                expiresIn: 43200
            });

            return new GenericServiceResponse(true, 'Login success', {
                token: accesToken,
                expiresIn: "43200 ms"
            });
        }
        else
            return new GenericServiceResponse(false, 'Incorrect password!', null);
    }

    async forgotPassword(email: string): Promise<GenericServiceResponse> {
        if (!email)
            return new GenericServiceResponse(false, 'Email is required!', null);

        const user = await this.userRepository.userExist(email);

        if (!user)
            return new GenericServiceResponse(false, 'Invalid user email!', null);

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        try {
            await this.userRepository.updatePasswordResetToken(user.email, token, now);
        } catch (error) {
            return new GenericServiceResponse(false, 'Error get reset token password!', null);
        }

        try {
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
        } catch (error) {
            return new GenericServiceResponse(false, 'Error send email with reset token!', null);
        }

        return new GenericServiceResponse(true, `Email successfully sent to ${user.email}`, null);
    }

    async resetPassword(email: string, password: string, token: string): Promise<GenericServiceResponse> {
        if (!email || !password || !token)
            return new GenericServiceResponse(false, 'Email, password and token are required', null);

        const user = await this.userRepository.userExist(email);

        if (!user)
            return new GenericServiceResponse(false, 'Invalid user email!', null);

        const now = new Date();

        if (user.passwordResetToken === token && now < new Date(user.passwordResetExpires)) {
            await this.userRepository.updatePassword(user.email, password);
            await this.userRepository.updatePasswordResetToken(user.email, null, null);
        }
        else
            return new GenericServiceResponse(false, 'Invalid Token!', null);

        return new GenericServiceResponse(true, 'Password changed successfully!', null);
    }

    async addAddress(obj: any): Promise<GenericServiceResponse> {
        const address = new Address(obj);

        if (await this.userRepository.userExist(address.userId))
            return new GenericServiceResponse(false, 'UserId invalid invalid!', null);

        if (address._errors.length > 0)
            return new GenericServiceResponse(false, address._errors.toString(), null);

        delete address._errors;

        try {
            const result = await this.userRepository.saveAddress(address);
            return new GenericServiceResponse(true, 'Address add successfully!', result);
        } catch (error) {
            return new GenericServiceResponse(false, 'Error add address.', null);
        }
    }
}