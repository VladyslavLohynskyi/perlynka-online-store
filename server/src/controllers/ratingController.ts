const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { IUser } from './basketController';
import Shoes from '../models/shoesModel';
import { Sequelize } from 'sequelize';
import { IDecodedJwt } from '../middleware/authMiddleware';
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

         const user = jwt.verify(token, process.env.SECRET_KEY_ACCESS) as IUser;

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

   async getAvgRating(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const shoes = await Shoes.findOne({ where: { id } });
         if (!shoes) {
            return res.json({ message: 'Error shoes not exist' });
         }
         const avgRating = await Rating.findOne({
            where: { shoId: id },
            attributes: [
               [Sequelize.fn('AVG', Sequelize.col('rate')), 'avgRating'],
               [Sequelize.fn('Count', Sequelize.col('rate')), 'countRatings'],
            ],
         });
         return res.json(avgRating);
      } catch (error) {
         console.log('get error AVG', error);
      }
   }
}

export default new RatingController();
