import Shoes from '../models/shoesModel';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises } from 'fs';
import { Request, Response } from 'express';
import ShoesSize from '../models/shoesSizeModel';

interface IParseSizes {
   sizeId: number;
   count: number;
}

interface shoesCreateRequest extends Request {
   body: {
      model: string;
      price: number;
      typeId: number;
      colorId: number;
      seasonId: number;
      brandId: number;
      sizes: string;
   };
}

class shoesController {
   async create(req: shoesCreateRequest, res: Response) {
      try {
         const { model, price, brandId, typeId, colorId, seasonId, sizes } =
            req.body;
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

         const shoes = await Shoes.create({
            model,
            price,
            rating: 0,
            brandId,
            typeId,
            colorId,
            seasonId,
            img: fileName,
         });
         const parseSizes: IParseSizes[] = JSON.parse(sizes);
         parseSizes.map(({ sizeId, count }) =>
            ShoesSize.create({ sizeId, count, shoId: shoes.id }),
         );
         return res.json(shoes);
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

   async deleteOne(req: Request, res: Response) {
      try {
         const { id } = req.params;

         const shoes = await Shoes.findOne({ where: { id } });
         if (shoes) {
            await Shoes.destroy({ where: { id } });
            await promises.unlink(
               path.resolve(__dirname, '..', 'static', shoes.img),
            );
            return res.json({ message: 'Shoes deleted', shoes });
         } else {
            return res.json({ message: "This Shoes doesn't exist" });
         }
      } catch (error) {
         res.json('Delete shoes error');
      }
   }

   async getOne(req: Request, res: Response) {
      try {
         const { id } = req.params;

         const shoes = await Shoes.findOne({
            where: { id },
         });
         if (!shoes) {
            return res.json({
               message: `Shoes with this id=${id} doesn't exist`,
            });
         }
         return res.json(shoes);
      } catch (error) {
         res.json('Getting One Error');
      }
   }
}

export default new shoesController();
