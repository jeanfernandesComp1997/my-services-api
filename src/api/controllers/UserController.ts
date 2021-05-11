import { Response, Request } from 'express';
import { ICreateUserRequestDTO } from '../../domain/dto/userDtos/ICreateUserRequestDTO';
import { IUserService } from '../../domain/services/IUserService';
import { IUserRepository } from '../../infra/repositories/IUserRepository';

export class UserController {
    constructor(
        private userRepository: IUserRepository,
        private userService: IUserService,
    ) { }

    async addUser(request: Request, response: Response): Promise<Response> {
        const { name, email, password, document, corporateDocument, corporateName } = request.body;
        const createUserRequest: ICreateUserRequestDTO = {
            name: name,
            email: email,
            password: password,
            document: document,
            corporateDocument: corporateDocument,
            corporateName: corporateName
        }

        try {
            const result = await this.userService.addUser(createUserRequest);

            if (result.isSuccess)
                return response.status(201).send(result.getValue());
            else
                return response.status(400).send(result.error);
        } catch (error) {
            return response.status(400).json({
                message: error.name || 'Unexpected error.'
            });
        }
    }

    async login(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.userService.login(request.body);

            if (result.isSuccess)
                return response.status(200).send(result.getValue());
            else
                return response.status(400).send(result.error);
        } catch (error) {
            return response.status(400).json({
                message: error.name || 'Unexpected error.'
            });
        }
    }

    async forgotPassword(request: Request, response: Response): Promise<Response> {
        try {
            const { email } = request.body;

            const result = await this.userService.forgotPassword(email);

            if (result.isSuccess)
                return response.status(200).send(result.getValue());
            else
                return response.status(400).send(result.error);
        } catch (error) {
            return response.status(400).json({
                message: error.name || 'Unexpected error.'
            });
        }
    }

    async resetPassword(request: Request, response: Response): Promise<Response> {
        try {
            const { email, newPassword, token } = request.body;

            const result = await this.userService.resetPassword(email, newPassword, token);

            if (result.isSuccess)
                return response.status(200).send(result.getValue());
            else
                return response.status(400).send(result.error);
        } catch (error) {
            return response.status(400).json({
                message: error.name || 'Unexpected error.'
            });
        }
    }

    async addAddress(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.userService.addAddress(request.body);

            if (result.isSuccess)
                return response.status(201).send(result.getValue());
            else
                return response.status(400).send(result.error);
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
                message: error.name || 'Unexpected error.'
            });
        }
    }
}