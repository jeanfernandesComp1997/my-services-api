import { Router } from "express";

const indexRoute = Router();

indexRoute.get('/', async (request, response) => {
    return response.status(200).send({ message: 'running' })
});

export { indexRoute };