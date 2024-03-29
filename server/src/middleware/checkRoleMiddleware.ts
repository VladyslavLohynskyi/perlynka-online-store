import { Response, NextFunction } from 'express';
import { Role } from '../models/userModel';
import { authRequest } from './authMiddleware';
import ApiError from '../exceptions/ApiError';

export default function (role: Role) {
   return function (req: authRequest, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
         next();
      }
      if (req.user?.role !== role) {
         return next(ApiError.forbidden('Користувач не має прав'));
      }
      next();
   };
}
