import ApiError from '../exceptions/ApiError';
import Size from '../models/sizeModel';
import { NextFunction, Request, Response } from 'express';

interface sizeCreateRequest extends Request {
   body: {
      size: number;
   };
}

interface sizeUpdateRequest extends Request {
   body: {
      id: string;
      size: number;
   };
}
class sizeController {
   async create(req: sizeCreateRequest, res: Response, next: NextFunction) {
      try {
         const { size } = req.body;
         const sizeObj = await Size.create({ size });
         return res.json({
            size: sizeObj,
            message: 'Розмір успішно створений',
         });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при створенні розміру'));
      }
   }
   async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const sizes = await Size.findAll({ order: [['size', 'ASC']] });
         return res.json(sizes);
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при отриманні всіх розмірів'),
         );
      }
   }
   async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const sizeObj = await Size.findOne({ where: { id } });
         if (!sizeObj) {
            return next(ApiError.notFound('Такого розміру не знайдено'));
         }

         await Size.destroy({ where: { id } });
         return res.json({ message: 'Розмір успішно видалено' });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при видаленні розміру'));
      }
   }
   async update(req: sizeUpdateRequest, res: Response, next: NextFunction) {
      try {
         const { id, size } = req.body;
         const sizeObj = await Size.findOne({ where: { id } });
         if (!sizeObj) {
            return next(ApiError.notFound('Такого розміру не знайдено'));
         }
         await Size.update({ size }, { where: { id } });
         return res.json({ message: 'Бренд успішно оновлено' });
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при редагуванні розміру'),
         );
      }
   }
}

export default new sizeController();
