const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { IUser } from './basketController';
import Shoes from '../models/shoesModel';
const { Rating } = require('../models/models');

interface IAddRatingToShoesRequest extends Request {
   body: {
      shoId: number;
      rate: number;
   };
}

class RatingController {
   async addRating(req: IAddRatingToShoesRequest, res: Response) {
      try {
         const { shoId, rate } = req.body;
         const token = req.header('authorization')!.split(' ')[1];
         const user = jwt.verify(token, process.env.SECRET_KEY) as IUser;
         const shoes = await Shoes.findOne({ where: { id: shoId } });
         if (!shoes) {
            return { message: 'Error shoes is not exist' };
         }
         const findRating = await Rating.findOne({
            where: { shoId, userId: user.id },
         });
         if (findRating) {
            await Rating.update(
               { rate },
               { where: { shoId, userId: user.id } },
            );
         } else {
            await Rating.create({ userId: user.id, shoId, rate });
         }
         return res.json({ message: 'New rating added' });
      } catch (error) {
         console.log('adding error', error);
      }
   }
}

export default new RatingController();
