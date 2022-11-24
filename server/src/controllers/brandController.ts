import Brand from '../models/brandModel';
import { Request, Response } from 'express';

interface brandCreateRequest extends Request {
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
   async create(req: brandCreateRequest, res: Response) {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
   }
   async getAll(req: Request, res: Response) {
      const brands = await Brand.findAll();
      return res.json(brands);
   }
   async delete(req: Request, res: Response) {
      const { id } = req.params;
      const brand = await Brand.findOne({ where: { id } });
      if (brand) {
         await Brand.destroy({ where: { id } });
         return res.json(brand);
      }
      return res.json({ message: 'Brand with this id is not exist' });
   }
   async update(req: colorUpdateRequest, res: Response) {
      const { id, name } = req.body;
      const brand = await Brand.findOne({ where: { id } });
      if (brand) {
         const updatedColor = await Brand.update({ name }, { where: { id } });
         return res.json({ updatedColor });
      }
      return res.json({ message: 'Brand with this id is not exist' });
   }
}

export default new TypeController();
