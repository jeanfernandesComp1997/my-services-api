import express from 'express';
import { userRoute } from './routes/UserRoute';

const app = express();
app.use(express.json());

app.use('/users', userRoute);

export { app };