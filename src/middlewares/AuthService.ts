import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

export const verifyJwt = (req: any, res: any, next: NextFunction) => {
    let token = req?.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    const secret = process?.env?.SECRET ?? "";

    jwt.verify(token.toString(), secret, function (err: any, decoded: any) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
};