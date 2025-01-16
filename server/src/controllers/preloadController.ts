import Brand from '../models/brandModel';
import Type from '../models/typeModel';
import Color from '../models/colorModel';
import Season from '../models/seasonModel';
import Size from '../models/sizeModel';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';

class PreloadController {
   async getPreloadData(req: Request, res: Response, next: NextFunction) {
      try {
         const [brands, types, colors, seasons, sizes] = await Promise.all([
            Brand.findAll(),
            Type.findAll(),
            Color.findAll(),
            Season.findAll(),
            Size.findAll(),
         ]);
         return res.json({
            brands,
            types,
            colors,
            seasons,
            sizes,
         });
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при отриманні початкових даних'),
         );
      }
   }
}

export default new PreloadController();
