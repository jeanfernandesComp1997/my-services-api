import { Credentials } from './../entities/Credentials';
import { Result } from './result/Result';
import { Address } from '../entities/Address';
import { User } from './../entities/User';
import { ICreateUserRequestDTO } from '../dto/userDtos/ICreateUserRequestDTO';

export interface IUserService {
    addUser(user: ICreateUserRequestDTO): Promise<Result<User>>;
    login(credentials): Promise<Result<Credentials>>;
    forgotPassword(email: string): Promise<Result<any>>;
    resetPassword(email: string, password: string, token: string): Promise<Result<any>>;
    addAddress(address: Address): Promise<Result<Address>>;
}