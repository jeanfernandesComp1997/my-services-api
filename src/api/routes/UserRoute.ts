import { userController } from './../controllers/';
import { Router } from "express";
import { verifyJwt } from '../middlewares/AuthService';

const userRoute = Router();

userRoute.post('/', async (request, response) => {
    return await userController.addUser(request, response);
});

userRoute.post('/login', async (request, response) => {
    return await userController.login(request, response);
});

userRoute.post('/forgotpassword', async (request, response) => {
    return await userController.forgotPassword(request, response);
});

userRoute.post('/resetpassword', async (request, response) => {
    return await userController.resetPassword(request, response);
});

userRoute.post('/addaddress', verifyJwt, async (request, response) => {
    return await userController.addAddress(request, response);
});

userRoute.get('/', /*verifyJwt,*/ async (request, response) => {
    return await userController.getAllUsers(request, response);
});

export { userRoute };