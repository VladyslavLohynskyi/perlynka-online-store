import { Request, RequestHandler, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Basket from '../models/basketModel';
import { Role } from '../models/userModel';
import BasketShoes from '../models/basketShoesModel';
import Shoes from '../models/shoesModel';
import Size from '../models/sizeModel';
import { Sequelize } from 'sequelize';

interface addToBasketRequest extends Request {
   body: {
      shoId: number;
      sizeId: number;
      count: number;
   };
}

interface IUser {
   id: string;
   email: string;
   role: Role;
}

interface ITotalCountResFormDb {
   totalCount: string;
}

interface IChangeCountRequest extends Request {
   body: {
      basketShoesId: number;
   };
}
class BasketController {
   async addToBasket(req: addToBasketRequest, res: Response) {
      try {
         const { shoId, sizeId, count } = req.body;
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });

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
            return res.json({ message: 'Shoes added to basket' });
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
            return res.json({ message: 'Shoes added to basket' });
         }
      } catch (error) {
         console.log(error);
      }
   }
   async getBasket(req: Request, res: Response) {
      try {
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
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
         console.log(error);
      }
   }
   async deleteOneShoesFromBasket(req: Request, res: Response) {
      try {
         const { id, sizeId } = req.params;
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         const shoes = await BasketShoes.findOne({
            where: { shoId: id, basketId: basket!.id, sizeId: +sizeId },
         });
         if (shoes) {
            await BasketShoes.destroy({
               where: { shoId: id, basketId: basket!.id, sizeId: +sizeId },
            });
            return res.json({ message: 'Shoes deleted from basket', shoes });
         }
         return res.json({ message: 'Shoes with this id is not exist' });
      } catch (error) {
         console.log('DELETE one shoes from basket ERROR', error);
      }
   }
   async deleteAllFromBasket(req: Request, res: Response) {
      try {
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         await BasketShoes.destroy({
            where: { basketId: basket!.id },
         });

         return res.json({ message: 'Basket Clear' });
      } catch (error) {
         console.log('DELETE all shoes from basket ERROR', error);
      }
   }

   async incrementCount(req: IChangeCountRequest, res: Response) {
      const { basketShoesId } = req.body;
      const token = req.header('authorization')!.split(' ')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
      const basket = await Basket.findOne({ where: { userId: user.id } });
      await BasketShoes.increment(
         { count: 1 },
         { where: { basketId: basket!.id, id: basketShoesId } },
      );
      return res.json({ message: 'Shoes added to basket' });
   }
   async decrementCount(req: IChangeCountRequest, res: Response) {
      const { basketShoesId } = req.body;
      const token = req.header('authorization')!.split(' ')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
      const basket = await Basket.findOne({ where: { userId: user.id } });
      const shoes = await BasketShoes.findOne({
         where: { basketId: basket!.id, id: basketShoesId },
      });
      if (shoes) {
         if (shoes.count === 1) {
            return res.json({ message: 'Count can not be smaller than 1' });
         }
         await BasketShoes.increment(
            { count: -1 },
            { where: { basketId: basket!.id, id: basketShoesId } },
         );
         return res.json({ message: 'Removed 1 shoes from basket' });
      }
      return res.json({ message: 'Shoes with that id is not exist' });
   }
   async getCountOfShoesInBasket(req: Request, res: Response) {
      const token = req.header('authorization')!.split(' ')[1];
      const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
      const basket = await Basket.findOne({ where: { userId: user.id } });
      const totalCount = await BasketShoes.findOne({
         attributes: [
            [Sequelize.fn('sum', Sequelize.col('count')), 'totalCount'],
         ],
         where: { basketId: basket!.id },
      });
      return res.json(totalCount);
   }
}

export default new BasketController();
