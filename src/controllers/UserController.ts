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

            return response.status(200).send(result);
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

    async forgotPassword(request: Request, response: Response): Promise<Response> {
        try {
            const { email } = request.body;

            if (!email) {
                return response.status(400).json({
                    message: 'Email is required!'
                });
            }

            const result = await this.userService.forgotPassword(email);

            return response.status(200).send(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            });
        }
    }

    async resetPassword(request: Request, response: Response): Promise<Response> {
        try {
            const { email, newPassword, token } = request.body;

            if (!email || !newPassword || !token) {
                return response.status(400).json({
                    message: 'All fields are required!'
                });
            }

            const result = await this.userService.resetPassword(email, newPassword, token);

            return response.status(200).send(result);
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            });
        }
    }
}