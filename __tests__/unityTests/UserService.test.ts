import { User } from './../../src/domain/entities/User';
import { MailProvider } from './../../src/infra/providers/implements/MailProvider';
import { UserRepository } from './../../src/infra/repositories/implementations/UserRepository';
import { UserService } from './../../src/domain/services/implementations/UserService';
jest.mock('./../../src/infra/repositories/implementations/UserRepository');

describe('User service testes', () => {
    const userRepository = new UserRepository();
    const mailProvider = new MailProvider();
    const userService = new UserService(userRepository, mailProvider);

    it('Should return success when create an user.', async () => {
        const request = {
            name: 'jean fernandes',
            email: 'jeanfernandes10@hotmail.com',
            password: '123',
            document: '',
            corporateDocument: '',
            corporateName: ''
        };

        const expectedResult = User.createUser(request).getValue();

        jest.spyOn(UserRepository.prototype, 'userExist').mockResolvedValue(null);
        jest.spyOn(UserRepository.prototype, 'saveUser').mockResolvedValue(expectedResult);

        const result = await userService.addUser(request);

        jest.clearAllMocks();

        expect(result.isSuccess).toEqual(true);
    });

    it('Should return fail when create an user with invalid request.', async () => {
        const request = {
            name: 'jean fernandes',
            email: 'jeanfernandes10@hotmail.com',
            password: '',
            document: '',
            corporateDocument: '',
            corporateName: ''
        };

        jest.spyOn(UserRepository.prototype, 'userExist').mockResolvedValue(null);

        const result = await userService.addUser(request);

        jest.clearAllMocks();

        expect(result.isSuccess).toEqual(false);
    });

    it('Should return fail when create an user when he already exist.', async () => {
        const request = {
            name: 'jean fernandes',
            email: 'jeanfernandes10@hotmail.com',
            password: '123',
            document: '',
            corporateDocument: '',
            corporateName: ''
        };

        jest.spyOn(UserRepository.prototype, 'userExist').mockResolvedValue(User.createUser(request).getValue());

        const result = await userService.addUser(request);

        jest.clearAllMocks();

        expect(result.isSuccess).toEqual(false);
    });

    it('Should return success when try login', async () => {
        const credentials = {
            email: 'jeanfernandes10@hotmail.com',
            password: '123456'
        };

        jest.spyOn(UserRepository.prototype, 'userExist').mockResolvedValue(User.createUser({
            name: 'jean fernandes',
            email: 'jeanfernandes10@hotmail.com',
            password: '{\"iv\":\"68f1d296139d4218edced14f1e38ef42\",\"content\":\"4927240d9df4\"}',
            document: '',
            corporateDocument: '',
            corporateName: ''
        }).getValue());

        const result = await userService.login(credentials);

        jest.clearAllMocks();

        expect(result.isSuccess).toEqual(true);
    });

    it('Should return fail when try login with incorrect password', async () => {
        const credentials = {
            email: 'jeanfernandes10@hotmail.com',
            password: '123'
        };

        jest.spyOn(UserRepository.prototype, 'userExist').mockResolvedValue(User.createUser({
            name: 'jean fernandes',
            email: 'jeanfernandes10@hotmail.com',
            password: '{\"iv\":\"68f1d296139d4218edced14f1e38ef42\",\"content\":\"4927240d9df4\"}',
            document: '',
            corporateDocument: '',
            corporateName: ''
        }).getValue());

        const result = await userService.login(credentials);

        jest.clearAllMocks();

        expect(result.isSuccess).toEqual(false);
    });

    it('Should return fail when try login without credentials', async () => {
        const credentials = {
            email: 'jeanfernandes10@hotmail.com'
        };

        jest.spyOn(UserRepository.prototype, 'userExist').mockResolvedValue(User.createUser({
            name: 'jean fernandes',
            email: 'jeanfernandes10@hotmail.com',
            password: '{\"iv\":\"68f1d296139d4218edced14f1e38ef42\",\"content\":\"4927240d9df4\"}',
            document: '',
            corporateDocument: '',
            corporateName: ''
        }).getValue());

        const result = await userService.login(credentials);

        jest.clearAllMocks();

        expect(result.isSuccess).toEqual(false);
    });

    it('Should return fail when try login with invalid email', async () => {
        const credentials = {
            email: 'jeanfernandes10@hotmail.com',
            password: '123'
        };

        jest.spyOn(UserRepository.prototype, 'userExist').mockResolvedValue(null);

        const result = await userService.login(credentials);

        jest.clearAllMocks();

        expect(result.isSuccess).toEqual(false);
    });
});