import { Address } from './../../domain/entities/Address';
import { User } from "../../domain/entities/User";
import { UserDTO } from '../../domain/dto/userDtos/UserDTO';

export interface IUserRepository {
    saveUser(user: User): Promise<User>;
    userExist(email: string): Promise<User | any>;
    updatePasswordResetToken(email: string, token?: string, expiresIn?: Date): Promise<void>;
    updatePassword(email: string, password: string): Promise<void>;
    saveAddress(address: Address): Promise<Address>;
    findAll(): Promise<Array<UserDTO>>;
}