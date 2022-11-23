import Color from '../models/colorModel';
import { Request, Response } from 'express';

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
class TypeController {
   async create(req: colorCreateRequest, res: Response) {
      const { name } = req.body;
      const color = await Color.create({ name });
      return res.json(color);
   }
   async getAll(req: Request, res: Response) {
      const colors = await Color.findAll();
      return res.json(colors);
   }
   async delete(req: Request, res: Response) {
      const { id } = req.params;
      const color = await Color.findOne({ where: { id } });
      if (color) {
         await Color.destroy({ where: { id } });
         return res.json(color);
      }
      return res.json({ message: 'Color with this id is not exist' });
   }
   async update(req: colorUpdateRequest, res: Response) {
      const { id, name } = req.body;
      const color = await Color.findOne({ where: { id } });
      if (color) {
         const updatedColor = await Color.update({ name }, { where: { id } });
         return res.json({ updatedColor });
      }
      return res.json({ message: 'Color with this id is not exist' });
   }
}

export default new TypeController();
