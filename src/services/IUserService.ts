import { GenericServiceResponse } from './Responses/GenericServiceResponse';
import { Address } from '../entities/Address';
import { User } from './../entities/User';

export interface IUserService {
    addUser(user: User): Promise<GenericServiceResponse>;
    login(credentials): Promise<GenericServiceResponse>;
    forgotPassword(email: string): Promise<GenericServiceResponse>;
    resetPassword(email: string, password: string, token: string): Promise<GenericServiceResponse>;
    addAddress(address: Address): Promise<GenericServiceResponse>;
}