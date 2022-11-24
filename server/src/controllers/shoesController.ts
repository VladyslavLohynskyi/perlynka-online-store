import Shoes from '../models/shoesModel';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Request, Response } from 'express';

interface shoesCreateRequest extends Request {
   body: {
      model: string;
      price: number;
      typeId: number;
      colorId: number;
      seasonId: number;
      brandId: number;
   };
}

class shoesController {
   async create(req: shoesCreateRequest, res: Response) {
      try {
         const { model, price, brandId, typeId, colorId, seasonId } = req.body;
         const img = req.files?.file;
         if (!img) {
            return res.json('Error: Upload one file');
         }
         const fileName = uuidv4() + '.jpg';
         if (!Array.isArray(img)) {
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
         } else {
            res.json('Error: Upload only one file');
         }

         const device = await Shoes.create({
            model,
            price,
            rating: 0,
            brandId,
            typeId,
            colorId,
            seasonId,
            img: fileName,
         });
         return res.json(device);
      } catch (error) {
         res.json('Shoes creating Error ');
      }
   }

   async getAll(req: Request, res: Response) {
      try {
         const shoes = await Shoes.findAll();
         return res.json(shoes);
      } catch (error) {
         res.json('Shoes get all Error');
      }
   }
}

export default new shoesController();
