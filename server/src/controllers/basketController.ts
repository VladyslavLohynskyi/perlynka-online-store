import { Request, RequestHandler, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Basket from '../models/basketModel';
import { Role } from '../models/userModel';
import BasketShoes from '../models/basketShoesModel';
import Shoes from '../models/shoesModel';

interface addToBasketRequest extends Request {
   body: {
      shoId: string;
   };
}

interface IUser {
   id: string;
   email: string;
   role: Role;
}
class BasketController {
   async addToBasket(req: addToBasketRequest, res: Response) {
      try {
         const { shoId } = req.body;

         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });

         const existShoes = await BasketShoes.findOne({
            where: { basketId: basket!.id, shoId: +shoId },
         });
         if (!existShoes) {
            await BasketShoes.create({
               basketId: basket!.id,
               shoId: +shoId,
               count: 1,
            });
            return res.json({ message: 'Shoes added to basket' });
         } else {
            await BasketShoes.increment(
               { count: 1 },
               { where: { basketId: basket!.id, shoId: +shoId } },
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
            attributes: { exclude: ['shoId'] },
            where: { basketId: basket!.id },
            include: {
               model: Shoes,
            },
         });
         return res.json(shoes);
      } catch (error) {
         console.log(error);
      }
   }
   async deleteOneShoesFromBasket(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
         const basket = await Basket.findOne({ where: { userId: user.id } });
         const shoes = await BasketShoes.findOne({
            where: { shoId: id, basketId: basket!.id },
         });
         if (shoes) {
            await BasketShoes.destroy({
               where: { shoId: id, basketId: basket!.id },
            });
            return res.json({ message: 'Shoes deleted from basket', shoes });
         }
         return res.json({ message: 'Shoes with this id is not exist' });
      } catch (error) {
         console.log('DELETE one shoes from basket ERROR', error);
      }
   }
}

export default new BasketController();
