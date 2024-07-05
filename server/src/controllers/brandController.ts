import Brand from '../models/brandModel';
import { NextFunction, Request, Response } from 'express';
import Shoes from '../models/shoesModel';
import ApiError from '../exceptions/ApiError';

interface brandCreateRequest extends Request {
   body: {
      name: string;
   };
}

interface brandUpdateRequest extends Request {
   body: {
      id: string;
      name: string;
   };
}
class brandController {
   async create(req: brandCreateRequest, res: Response, next: NextFunction) {
      try {
         const { name } = req.body;
         const brand = await Brand.create({ name });
         return res.json({
            element: brand,
            message: 'Бренд успішно створений',
         });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при створенні бренду'));
      }
   }
   async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const brands = await Brand.findAll();
         return res.json(brands);
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при отриманні всіх брендів'),
         );
      }
   }
   async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const brand = await Brand.findOne({ where: { id } });
         if (!brand) {
            return next(ApiError.notFound('Такого бренду не знайдено'));
         }

         await Shoes.destroy({ where: { brandId: id } });
         await Brand.destroy({ where: { id } });

         return res.json({ id: brand.id, message: 'Бренд успішно видалено' });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при видаленні бренду'));
      }
   }
   async update(req: brandUpdateRequest, res: Response, next: NextFunction) {
      try {
         const { id, name } = req.body;
         const brand = await Brand.findOne({ where: { id } });
         if (!brand) {
            return next(ApiError.notFound('Такого бренду не знайдено'));
         }
         await Brand.update({ name }, { where: { id } });
         return res.json({ message: 'Бренд успішно оновлено' });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при редагуванні бренду'));
      }
   }
}

export default new brandController();
