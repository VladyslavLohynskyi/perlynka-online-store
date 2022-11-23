import { Response, NextFunction } from 'express';
import { Role } from '../models/userModel';
import { authRequest } from './authMiddleware';

export default function (role: Role) {
   return function (req: authRequest, res: Response, next: NextFunction) {
      if (req.method === 'OPTIONS') {
         next();
      }
      if (req.user?.role !== role) {
         return res.status(403).json({ message: "User don't have permission" });
      }
      next();
   };
}
