import { userController } from './../controllers/';
import { Router } from "express";
const userRoute = Router();

userRoute.get('/', async (request, response) => {
    return await userController.getAllUsers(request, response);
});

userRoute.post('/', async (request, response) => {
    return await userController.addUser(request, response);
});

export { userRoute };