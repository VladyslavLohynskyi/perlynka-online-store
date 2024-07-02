import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/userModel';
import ApiError from '../exceptions/ApiError';

export interface IDecodedJwt {
   id: number;
   email: string;
   role: Role;
}

export interface authRequest extends Request {
   user?: IDecodedJwt;
}

export default function (req: authRequest, res: Response, next: NextFunction) {
   if (req.method === 'OPTIONS') {
      next();
   }
   try {
      let token: string | null = null;
      if (req.headers.authorization) {
         token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
         return next(ApiError.Unauthorized('Користувач не авторизований'));
      }
      const decoded = jwt.verify(
         token,
         process.env.SECRET_KEY_ACCESS,
      ) as IDecodedJwt;
      req.user = decoded;
      next();
   } catch (error) {
      return next(ApiError.Unauthorized('Користувач не авторизований'));
   }
}
