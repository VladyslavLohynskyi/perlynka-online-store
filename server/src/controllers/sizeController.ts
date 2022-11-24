import Size from '../models/sizeModel';
import { Request, Response } from 'express';

interface sizeCreateRequest extends Request {
   body: {
      size: number;
   };
}

interface sizeUpdateRequest extends Request {
   body: {
      id: string;
      size: number;
   };
}
class sizeController {
   async create(req: sizeCreateRequest, res: Response) {
      const { size } = req.body;
      const sizeObj = await Size.create({ size });
      return res.json(sizeObj);
   }
   async getAll(req: Request, res: Response) {
      const sizes = await Size.findAll();
      return res.json(sizes);
   }
   async delete(req: Request, res: Response) {
      const { id } = req.params;
      const sizeObj = await Size.findOne({ where: { id } });
      if (sizeObj) {
         await Size.destroy({ where: { id } });
         return res.json(sizeObj);
      }
      return res.json({ message: 'Size with this id is not exist' });
   }
   async update(req: sizeUpdateRequest, res: Response) {
      const { id, size } = req.body;
      const sizeObj = await Size.findOne({ where: { id } });
      if (sizeObj) {
         const updatedSize = await Size.update({ size }, { where: { id } });
         return res.json({ updatedSize });
      }
      return res.json({ message: 'Size with this id is not exist' });
   }
}

export default new sizeController();
