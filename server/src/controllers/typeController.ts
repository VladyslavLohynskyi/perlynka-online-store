import Type from '../models/typeModel';
import { Request, Response } from 'express';

interface typeCreateRequest extends Request {
   body: {
      name: string;
   };
}

interface typeUpdateRequest extends Request {
   body: {
      id: string;
      name: string;
   };
}
class TypeController {
   async create(req: typeCreateRequest, res: Response) {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
   }
   async getAll(req: Request, res: Response) {
      const types = await Type.findAll();
      return res.json(types);
   }
   async delete(req: Request, res: Response) {
      const { id } = req.params;
      const type = await Type.findOne({ where: { id } });
      if (type) {
         await Type.destroy({ where: { id } });
         return res.json(type);
      }
      return res.json({ message: 'Type with this id is not exist' });
   }
   async update(req: typeUpdateRequest, res: Response) {
      const { id, name } = req.body;
      const type = await Type.findOne({ where: { id } });
      if (type) {
         const updatedType = await Type.update({ name }, { where: { id } });
         return res.json({ updatedType });
      }
      return res.json({ message: 'Type with this id is not exist' });
   }
}

export default new TypeController();
