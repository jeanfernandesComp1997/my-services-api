import { IUserService } from './../services/IUserService';
import { IUserRepository } from './../repositories/IUserRepository';
import { Response, Request } from 'express';

export class UserController {
    constructor(
        private userRepository: IUserRepository,
        private userService: IUserService,
    ) { }

    async addUser(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.userService.addUser(request.body);

            return response.status(201).send(user);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            });
        }
    }

    async login(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.userService.login(request.body);

            return response.status(201).send(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            });
        }
    }

    async getAllUsers(request: Request, response: Response): Promise<Response> {
        try {
            const users = await this.userRepository.findAll();

            return response.status(200).send(users);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            });
        }
    }

    async addAddress(request: Request, response: Response): Promise<Response> {
        try {
            const user = await this.userService.addAddress(request.body);

            return response.status(201).send(user);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            });
        }
    }
}