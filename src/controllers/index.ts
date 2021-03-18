import { MailProvider } from './../providers/implements/MailProvider';
import { UserService } from './../services/implementations/UserService';
import { UserRepository } from './../repositories/implementations/UserRepository';
import { UserController } from './UserController';

const userRepository = new UserRepository();
const mailProvider = new MailProvider();
const userService = new UserService(userRepository, mailProvider);
const userController = new UserController(userRepository, userService);

export { userController }