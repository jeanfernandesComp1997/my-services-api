import { Address } from '../entities/Address';
import { User } from './../entities/User';

export interface IUserService {
    addUser(user: User): Promise<User>;
    addAddress(address: Address): Promise<Address>;
}