import express from 'express';
import { indexRoute } from './routes';
import { userRoute } from './routes/UserRoute';

const app = express();
app.use(express.json());

app.use('/users', userRoute);
app.use('/checkstatus', indexRoute)

export { app };