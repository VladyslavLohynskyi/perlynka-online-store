import Season from '../models/seasonModel';
import { Request, Response } from 'express';
import Shoes from '../models/shoesModel';

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
   async create(req: seasonCreateRequest, res: Response) {
      const { name } = req.body;
      const season = await Season.create({ name });
      return res.json(season);
   }
   async getAll(req: Request, res: Response) {
      const seasons = await Season.findAll();
      return res.json(seasons);
   }
   async delete(req: Request, res: Response) {
      const { id } = req.params;
      const season = await Season.findOne({ where: { id } });
      if (season) {
         await Shoes.destroy({ where: { seasonId: id } });
         await Season.destroy({ where: { id } });
         return res.json(season);
      }
      return res.json({ message: 'Season with this id is not exist' });
   }
   async update(req: colorUpdateRequest, res: Response) {
      const { id, name } = req.body;
      const season = await Season.findOne({ where: { id } });
      if (season) {
         const updatedSeason = await Season.update({ name }, { where: { id } });
         return res.json({ updatedSeason });
      }
      return res.json({ message: 'Season with this id is not exist' });
   }
}

export default new seasonController();
