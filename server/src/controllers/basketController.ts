import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Basket from '../models/basketModel';
import { Role } from '../models/userModel';
import { BasketShoes } from '../models/models';


interface addDeviceRequest extends Request{
    body: {
        shoId: string
    }
}

interface IUser {
    id:string;
    email:string;
    role: Role;
}
class BasketController {
  async addShoes(req:addDeviceRequest, res:Response) {
    console.log(true);
    try {
      const { shoId } = req.body;

      const token = req.header('authorization')!.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
      const basket = await Basket.findOne({ where: { userId: user.id } });

      const existShoes = await BasketShoes.findOne({
        where: { basketId: basket!.id, shoId },
      });
      if (!existShoes) {
        await BasketShoes.create({
          basketId: basket!.id,
          shoId,
        });
        return res.json({ message: "Shoes added to basket" });
      } else {
       await BasketShoes.increment(
          { count: 1 },
          { where: { basketId: basket!.id, shoId } }
        );
        return res.json({ message: "Shoes added to basket" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new BasketController();
