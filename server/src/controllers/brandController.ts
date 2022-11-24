import Brand from '../models/brandModel';
import { Request, Response } from 'express';

interface brandCreateRequest extends Request {
   body: {
      name: string;
   };
}

interface brandUpdateRequest extends Request {
   body: {
      id: string;
      name: string;
   };
}
class brandController {
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
   async update(req: brandUpdateRequest, res: Response) {
      const { id, name } = req.body;
      const brand = await Brand.findOne({ where: { id } });
      if (brand) {
         const updatedBrand = await Brand.update({ name }, { where: { id } });
         return res.json({ updatedBrand });
      }
      return res.json({ message: 'Brand with this id is not exist' });
   }
}

export default new brandController();
