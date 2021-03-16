import { userController } from './../controllers/';
import { request, response, Router } from "express";
const userRoute = Router();

userRoute.get('/', async (request, response) => {
    return await userController.getAllUsers(request, response);
});

userRoute.post('/', async (request, response) => {
    return await userController.addUser(request, response);
});

userRoute.post('/addaddress', async (request, response) => {
    return await userController.addAddress(request, response);
});

export { userRoute };