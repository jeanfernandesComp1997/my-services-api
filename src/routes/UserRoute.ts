import { verifyJwt } from './../auth/AuthService';
import { userController } from './../controllers/';
import { Router } from "express";

const userRoute = Router();

userRoute.get('/', verifyJwt, async (request, response) => {
    return await userController.getAllUsers(request, response);
});

userRoute.post('/', async (request, response) => {
    return await userController.addUser(request, response);
});

userRoute.post('/login', async (request, response) => {
    return await userController.login(request, response);
});

userRoute.post('/addaddress', verifyJwt, async (request, response) => {
    return await userController.addAddress(request, response);
});

export { userRoute };