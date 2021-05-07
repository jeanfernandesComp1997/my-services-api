import express from 'express';
import { userRoute } from './api/routes/UserRoute';

const app = express();
app.use(express.json());

app.use('/users', userRoute);

export { app };