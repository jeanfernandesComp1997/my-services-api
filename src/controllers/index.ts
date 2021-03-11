import { UserService } from './../services/implementations/UserService';
import { UserRepository } from './../repositories/implementations/UserRepository';
import { UserController } from './UserController';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userRepository, userService);

export { userController }