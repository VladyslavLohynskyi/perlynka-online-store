import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';
export default function (
   err: ApiError,
   req: Request,
   res: Response,
   next: NextFunction,
) {
   if (err instanceof ApiError) {
      return res.status(err.status).json(err.message);
   }
   return res.status(500).json('Невідома помилка');
}
