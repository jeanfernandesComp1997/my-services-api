import { Address } from '../entities/Address';
import { User } from './../entities/User';

export interface IUserService {
    addUser(user: User): Promise<User>;
    addAddress(address: Address): Promise<Address>;
    login(credentials): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    resetPassword(email: string, password: string, token: string): Promise<any>;
}