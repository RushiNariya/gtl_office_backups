import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IRequest from '../interfaces/IRequest';

const tokenMiddleware = (req: IRequest, res: Response, next: NextFunction): void => {
  const token: string = req.headers && req.headers.authorization;
  if (token) {
    const decodedJWTData: { id: string } = jwt.verify(token, 'randomTokenSecretKey123') as { id: string };
    req.user = decodedJWTData;
    req.userId = decodedJWTData.id;
    next();
  }
  else {
    res.status(401).json({
      err: 'unauthorized access',
    });
  }
};

export {
  tokenMiddleware
};