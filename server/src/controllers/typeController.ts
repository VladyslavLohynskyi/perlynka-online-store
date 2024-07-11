import ApiError from '../exceptions/ApiError';
import Shoes from '../models/shoesModel';
import Type from '../models/typeModel';
import { NextFunction, Request, Response } from 'express';

interface typeCreateRequest extends Request {
   body: {
      name: string;
   };
}

interface typeUpdateRequest extends Request {
   body: {
      id: string;
      name: string;
   };
}
class TypeController {
   async create(req: typeCreateRequest, res: Response, next: NextFunction) {
      try {
         const { name } = req.body;
         const type = await Type.create({ name });
         return res.json({
            element: type,
            message: 'Новий тип успішно створенний',
         });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при створенні типу '),
         );
      }
   }
   async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const types = await Type.findAll();
         return res.json(types);
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при отриманні всіх типів'),
         );
      }
   }
   async delete(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const type = await Type.findOne({ where: { id } });
         if (!type) {
            return next(ApiError.notFound('Такого типу не знайдено'));
         }

         await Shoes.destroy({ where: { typeId: id } });
         await Type.destroy({ where: { id } });
         return res.json({ id: type.id, message: 'Тип успішно видалено' });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при видаленні типу'));
      }
   }
   async update(req: typeUpdateRequest, res: Response, next: NextFunction) {
      try {
         const { id, name } = req.body;
         const type = await Type.findOne({ where: { id } });
         if (!type) {
            return next(ApiError.notFound('Такого типу не знайдено'));
         }
         await Type.update({ name }, { where: { id } });
         return res.json({ message: 'Тип успішно оновлено' });
      } catch (error) {
         return next(ApiError.internalServer('Помилка при редагуванні типу'));
      }
   }
}

export default new TypeController();
