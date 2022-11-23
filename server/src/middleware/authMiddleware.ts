import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/userModel';

interface IDecodedJwt {
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
         return res.status(401).json({ message: 'User not authorized' });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY) as IDecodedJwt;
      req.user = decoded;
      next();
   } catch (error) {
      res.status(401).json({ message: 'User not authorized' });
   }
}
