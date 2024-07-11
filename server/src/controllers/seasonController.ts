import Season from '../models/seasonModel';
import { NextFunction, Request, Response } from 'express';
import Shoes from '../models/shoesModel';
import ApiError from '../exceptions/ApiError';

interface seasonCreateRequest extends Request {
   body: {
      name: string;
   };
}

interface colorUpdateRequest extends Request {
   body: {
      id: string;
      name: string;
   };
}
class seasonController {
   async create(req: seasonCreateRequest, res: Response, next: NextFunction) {
      try {
         const { name } = req.body;
         const season = await Season.create({ name });
         return res.json({
            element: season,
            message: 'Новий сезон успішно створенний',
         });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при створенні сезону'),
         );
      }
   }
   async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const seasons = await Season.findAll();
         return res.json(seasons);
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при отриманні всіх сезонів'),
         );
      }
   }
   async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const season = await Season.findOne({ where: { id } });
         if (!season) {
            return next(ApiError.notFound('Такого сезону не знайдено'));
         }

         await Shoes.destroy({ where: { seasonId: id } });
         await Season.destroy({ where: { id } });
         return res.json({ id: season.id, message: 'Сезон успішно видалено' });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при видаленні сезону'));
      }
   }
   async update(req: colorUpdateRequest, res: Response, next: NextFunction) {
      try {
         const { id, name } = req.body;
         const season = await Season.findOne({ where: { id } });
         if (!season) {
            return next(ApiError.notFound('Такого сезону не знайдено'));
         }
         await Season.update({ name }, { where: { id } });
         return res.json({ message: 'Сезон успішно оновлено' });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при редагуванні ceзону'));
      }
   }
}

export default new seasonController();
