jest.mock('./../../src/repositories/implementations/UserRepository');
import { UserService } from './../../src/services/implementations/UserService';
import { MailProvider } from './../../src/providers/implements/MailProvider';
import { UserRepository } from './../../src/repositories/implementations/UserRepository';
import { User } from '../../src/entities/User';

describe('User service testes', () => {
    it('Should return success when create an user', async () => {
        const request = {
            name: 'jean fernandes',
            email: 'jeanfernandes10@hotmail.com',
            password: '123',
            document: '',
            corporateDocument: '',
            corporateName: ''
        };
        const expectedResult = new User(request);
        const userRepository = new UserRepository();
        const mailProvider = new MailProvider();
        const userService = new UserService(userRepository, mailProvider);

        const spy = jest.spyOn(UserRepository.prototype, 'userExist').mockResolvedValue(null);
        jest.spyOn(UserRepository.prototype, 'saveUser').mockResolvedValue(expectedResult);

        let result;

        try {
            result = await userService.addUser(request);
        } catch (error) {
            throw error;
        }

        spy.mockClear();

        expect(result.isSuccess).toEqual(true);
    });
});