import { UserService } from "../../domain/services/implementations/UserService";
import { MailProvider } from "../../infra/providers/implements/MailProvider";
import { UserRepository } from "../../infra/repositories/implementations/UserRepository";
import { UserController } from "./UserController";
import { IUserService } from "../../domain/services/IUserService";
import { IMailProvider } from "../../infra/providers/IMailProvider";
import { IUserRepository } from "../../infra/repositories/IUserRepository";

const userRepository: IUserRepository = new UserRepository();
const mailProvider: IMailProvider = new MailProvider();
const userService: IUserService = new UserService(userRepository, mailProvider);
const userController = new UserController(userRepository, userService);

export { userController }