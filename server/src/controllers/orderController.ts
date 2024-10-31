import { Request, Response, NextFunction } from 'express';

import ApiError from '../exceptions/ApiError';

class OrderController {
   async create(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при створенні замовлення'),
         );
      }
   }

   async getAll(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при отриманні замовлень'),
         );
      }
   }
   async deleteOne(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при видаленні замовлення'),
         );
      }
   }

   async update(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при оновленні замовлення'),
         );
      }
   }
}

export default new OrderController();
