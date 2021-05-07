import { Credentials } from './../../entities/Credentials';
import { Result } from './../result/Result';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Address } from './../../entities/Address';
import { User } from './../../entities/User';
import { IUserService } from './../IUserService';
import { IUserRepository } from '../../../infra/repositories/IUserRepository';
import { IMailProvider } from '../../../infra/providers/IMailProvider';
import { decrypt, encrypt } from '../../libs/Crypt';
import 'dotenv/config';

export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) { }

    async addUser(obj: any): Promise<Result<User>> {
        const resultUser = User.createUser(obj);

        if (!resultUser.isSuccess)
            return Result.fail<User>(resultUser.error);

        const user = resultUser.getValue();

        if (await this.userRepository.userExist(user._email))
            return Result.fail<User>('Email already in use!');

        user.setPassword(JSON.stringify(encrypt(user._password)));

        const result = await this.userRepository.saveUser(user);

        return Result.ok<User>(result);
    }

    async login(credentials: any): Promise<Result<Credentials>> {
        const { email, password } = credentials;

        if (!email || !password)
            return Result.fail<Credentials>('Email and Password are required.');

        const user = await this.userRepository.userExist(email);

        if (!user)
            return Result.fail<Credentials>('Sorry, this email is invalid.');

        const userPassword = decrypt(JSON.parse(user._password));

        if (user && userPassword === password) {
            const accesToken = await jwt.sign({ email: user._email }, process.env.SECRET, {
                expiresIn: 43200
            });

            return Result.ok<Credentials>(new Credentials({
                token: accesToken,
                expiresIn: "43200 ms"
            }))
        }
        else
            return Result.fail<Credentials>('Incorrect password!');
    }

    async forgotPassword(email: string): Promise<Result<any>> {
        if (!email)
            return Result.fail<any>('Email is required!');

        const user = await this.userRepository.userExist(email);

        if (!user)
            return Result.fail<any>('Invalid user email!');

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await this.userRepository.updatePasswordResetToken(user._email, token, now);

        try {
            await this.mailProvider.sendMail({
                to: {
                    name: 'MyServiceAPI',
                    email: 'noreply@myservice.com',
                },
                from: {
                    name: user._name,
                    email: user._email,
                },
                subject: 'Recuperação de senha',
                body: `<p>Olá, use o seguinte token para alterar sua senha: ${token}</p>`
            });
        } catch (error) {
            return Result.fail<any>('Error send email with reset token!');
        }

        return Result.ok<any>({ message: `Email successfully sent to ${user._email}` });
    }

    async resetPassword(email: string, password: string, token: string): Promise<Result<any>> {
        if (!email || !password || !token)
            return Result.fail<any>('Email, password and token are required.');

        const user = await this.userRepository.userExist(email);

        if (!user)
            return Result.fail<any>('Invalid user email!');

        const now = new Date();

        if (user._passwordResetToken === token && now < new Date(user._passwordResetExpires)) {
            await this.userRepository.updatePassword(user._email, JSON.stringify(encrypt(password)));
            await this.userRepository.updatePasswordResetToken(user._email, null, null);
        }
        else
            return Result.fail<any>('Invalid Token!');

        return Result.ok<any>({ message: 'Password changed successfully!' });
    }

    async addAddress(obj: any): Promise<Result<Address>> {
        const resultAddress = Address.createAddress(obj);

        if (!resultAddress.isSuccess)
            return Result.fail<Address>(resultAddress.error);

        const address = resultAddress.getValue();

        if (await this.userRepository.userExist(address._userId))
            return Result.fail<Address>('UserId invalid invalid!');

        const result = await this.userRepository.saveAddress(address);

        return Result.ok<Address>(result);
    }
}