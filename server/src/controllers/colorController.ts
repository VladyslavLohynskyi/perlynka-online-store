import Color from '../models/colorModel';
import { NextFunction, Request, Response } from 'express';
import Shoes from '../models/shoesModel';
import ApiError from '../exceptions/ApiError';

interface colorCreateRequest extends Request {
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
class colorController {
   async create(req: colorCreateRequest, res: Response, next: NextFunction) {
      try {
         const { name } = req.body;
         const color = await Color.create({ name });
         return res.json({
            element: color,
            message: 'Новий колір успішно створений',
         });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при створенні кольору'),
         );
      }
   }
   async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const colors = await Color.findAll();
         return res.json(colors);
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при отриманні всіх кольорів'),
         );
      }
   }
   async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const color = await Color.findOne({ where: { id } });
         if (!color) {
            return next(ApiError.notFound('Такого кольору не знайдено'));
         }

         await Shoes.destroy({ where: { colorId: id } });
         await Color.destroy({ where: { id } });
         return res.json({ id: color.id, message: 'Колір успішно видалено' });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при видаленні кольору'));
      }
   }
   async update(req: colorUpdateRequest, res: Response, next: NextFunction) {
      try {
         const { id, name } = req.body;
         const color = await Color.findOne({ where: { id } });
         if (!color) {
            return next(ApiError.notFound('Такого кольору не знайдено'));
         }
         await Color.update({ name }, { where: { id } });
         return res.json({ message: 'Колір успішно оновлено' });
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при редагуванні кольору'),
         );
      }
   }
}

export default new colorController();
