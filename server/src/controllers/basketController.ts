import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Basket from '../models/basketModel';
import { Role } from '../models/userModel';
import BasketShoes from '../models/basketShoesModel';
import Shoes from '../models/shoesModel';
import Size from '../models/sizeModel';
import { Sequelize } from 'sequelize';
import ApiError from '../exceptions/ApiError';

interface IAddShoes {
   shoId: number;
   sizeId: number;
   count: number;
}

export interface IUser {
   id: string;
   email: string;
   role: Role;
}

interface IChangeCountRequest extends Request {
   body: {
      basketShoesId: number;
   };
}

interface IAddALotOfShoesToBasketRequest extends Request {
   body: {
      shoes: string;
   };
}
class BasketController {
   async getBasket(req: Request, res: Response, next: NextFunction) {
      try {
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY_ACCESS) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         if (!basket) {
            return next(ApiError.notFound('Не знайдено козрину для товарів'));
         }

         const shoes = await BasketShoes.findAll({
            attributes: { exclude: ['shoId', 'sizeId'] },
            where: { basketId: basket!.id },
            include: [
               {
                  model: Shoes,
               },
               { model: Size },
            ],
            order: [['id', 'ASC']],
         });
         return res.json(shoes);
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при отримані корзини товарів',
            ),
         );
      }
   }
   async deleteOneShoesFromBasket(
      req: Request,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { id, sizeId } = req.params;
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY_ACCESS) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         if (!basket) {
            return next(ApiError.notFound('Не знайдено козрину для товарів'));
         }
         const shoes = await BasketShoes.findOne({
            where: { shoId: id, basketId: basket!.id, sizeId: +sizeId },
         });
         if (!shoes) {
            return next(
               ApiError.notFound('Взуття для видалення з корзини не знайдено'),
            );
         }
         await BasketShoes.destroy({
            where: { shoId: id, basketId: basket!.id, sizeId: +sizeId },
         });
         return res.json({ message: 'Взуття видалено успішно' });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при видалені одного товару з корзини',
            ),
         );
      }
   }
   async deleteAllFromBasket(req: Request, res: Response, next: NextFunction) {
      try {
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY_ACCESS) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         if (!basket) {
            return next(ApiError.notFound('Не знайдено козрину для товарів'));
         }
         await BasketShoes.destroy({
            where: { basketId: basket!.id },
         });

         return res.json({ message: 'Корзину товарів очищено успішно' });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при видалені з корзини всіх товарів',
            ),
         );
      }
   }

   async incrementCount(
      req: IChangeCountRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { basketShoesId } = req.body;
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY_ACCESS) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         if (!basket) {
            return next(ApiError.notFound('Не знайдено козрину для товарів'));
         }
         await BasketShoes.increment(
            { count: 1 },
            { where: { basketId: basket!.id, id: basketShoesId } },
         );
         return res.json({ message: 'Товар успішно додано в корзину' });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при збільшені кількості товару в корзині',
            ),
         );
      }
   }
   async decrementCount(
      req: IChangeCountRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { basketShoesId } = req.body;
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY_ACCESS) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         if (!basket) {
            return next(ApiError.notFound('Не знайдено козрину для товарів'));
         }
         const shoes = await BasketShoes.findOne({
            where: { basketId: basket!.id, id: basketShoesId },
         });

         if (!shoes) {
            return next(
               ApiError.notFound('Взуття в корзині товарів не було знайденно'),
            );
         }
         if (shoes) {
            if (shoes.count === 1) {
               return next(
                  ApiError.badRequest(
                     'Кількість товару в корзині не може бути меншою за 1 одиницю',
                  ),
               );
            }
            await BasketShoes.increment(
               { count: -1 },
               { where: { basketId: basket!.id, id: basketShoesId } },
            );
            return res.json({
               message: '1 одиницю товару успішно видалено з корзини',
            });
         }
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при зменшині кількості товару в корзині',
            ),
         );
      }
   }
   async getCountOfShoesInBasket(
      req: Request,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY_ACCESS) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         if (!basket) {
            return next(ApiError.notFound('Не знайдено козрину для товарів'));
         }
         const totalCount = await BasketShoes.findOne({
            attributes: [
               [Sequelize.fn('sum', Sequelize.col('count')), 'totalCount'],
            ],
            where: { basketId: basket!.id },
         });
         return res.json(totalCount);
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при отримані загальної кількості товару в корзині',
            ),
         );
      }
   }

   async addToBasket(
      req: IAddALotOfShoesToBasketRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { shoes } = req.body;
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY_ACCESS) as IUser;
         const parsedShoes = JSON.parse(shoes) as IAddShoes[];
         const basket = await Basket.findOne({
            where: { userId: user.id },
         });

         if (!basket) {
            return next(ApiError.notFound('Не знайдено козрину для товарів'));
         }

         parsedShoes.forEach(async ({ shoId, sizeId, count }) => {
            const existShoes = await BasketShoes.findOne({
               where: { basketId: basket!.id, shoId, sizeId },
            });
            if (!existShoes) {
               await BasketShoes.create({
                  basketId: basket!.id,
                  shoId,
                  count,
                  sizeId,
               });
            } else {
               await BasketShoes.increment(
                  { count },
                  {
                     where: {
                        basketId: basket!.id,
                        shoId,
                        sizeId,
                     },
                  },
               );
            }
         });
         return res.json({ message: 'Взуття успішно додано до кошику' });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при додавані товару в корзину',
            ),
         );
      }
   }
}

export default new BasketController();
