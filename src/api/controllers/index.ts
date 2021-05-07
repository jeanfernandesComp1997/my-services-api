import { UserService } from "../../domain/services/implementations/UserService";
import { MailProvider } from "../../infra/providers/implements/MailProvider";
import { UserRepository } from "../../infra/repositories/implementations/UserRepository";
import { UserController } from "./UserController";
import { TestRepository } from './../../infra/repositories/implementations/TestRepository';
const { v4: idGen } = require('uuid')

const testRepository = new TestRepository(idGen());
const userRepository = new UserRepository();
const mailProvider = new MailProvider();
const userService = new UserService(userRepository, mailProvider);
const userController = new UserController(userRepository, userService, testRepository);

export { userController }