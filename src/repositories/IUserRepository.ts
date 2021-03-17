import { Address } from './../entities/Address';
import { User } from "../entities/User";
import { UserAddressDTO } from '../DTOS/userDtos/UserAddressDTO';

export interface IUserRepository {
    findAll(): Promise<Array<UserAddressDTO>>;
    saveUser(user): Promise<User>;
    userExist(email: string): Promise<User>;
    saveAddress(address: Address): Promise<Address>;
    getUserByEmailAndPassword(email: string, password: string): Promise<User>;
}