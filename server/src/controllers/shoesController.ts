import Shoes from '../models/shoesModel';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises } from 'fs';
import { Request, Response } from 'express';
import ShoesSize from '../models/shoesSizeModel';
import Brand from '../models/brandModel';

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

interface shoesUpdateRequest extends Request {
   body: {
      id: number;
      model?: string;
      price?: number;
      typeId?: number;
      colorId?: number;
      seasonId?: number;
      brandId?: number;
      sizes?: string;
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
         if (Array.isArray(parseSizes)) {
            parseSizes.map(({ sizeId, count }) =>
               ShoesSize.create({ sizeId, count, shoId: shoes.id }),
            );
         }
         console.log(shoes);
         return res.json(shoes);
      } catch (error) {
         res.json('Shoes creating Error ');
      }
   }

   async getAll(req: Request, res: Response) {
      try {
         const shoes = await Shoes.findAll({
            attributes: { exclude: ['brandId'] },
            include: [{ model: Brand, as: 'brand' }],
            order: [
               ['id', 'DESC'],
               ['model', 'ASC'],
            ],
         });
         return res.json(shoes);
      } catch (error) {
         res.json('Shoes get all Error');
      }
   }

   async deleteOne(req: Request, res: Response) {
      try {
         const { id } = req.params;

         const shoes = await Shoes.findOne({ where: { id: id } });
         if (shoes) {
            await ShoesSize.destroy({ where: { shoId: id } });
            await Shoes.destroy({ where: { id: id } });
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

   async update(req: shoesUpdateRequest, res: Response) {
      try {
         const { id, model, price, brandId, typeId, colorId, seasonId, sizes } =
            req.body;
         const shoes = await Shoes.findOne({ where: { id } });
         if (!shoes) {
            return res.json(`Error: Shoes with id=${id} is not exist`);
         }
         const img = req.files?.file;
         if (!Array.isArray(img) && img) {
            await promises.unlink(
               path.resolve(__dirname, '..', 'static', shoes.img),
            );
            img.mv(path.resolve(__dirname, '..', 'static', shoes.img));
         }

         await Shoes.update(
            {
               model: model ? model : shoes.model,
               price: price ? price : shoes.price,
               brandId: brandId ? brandId : shoes.brandId,
               typeId: typeId ? typeId : shoes.typeId,
               colorId: colorId ? colorId : shoes.colorId,
               seasonId: seasonId ? seasonId : shoes.seasonId,
            },
            { where: { id } },
         );
         if (sizes) {
            const parseSizes: IParseSizes[] = JSON.parse(sizes);
            if (Array.isArray(parseSizes)) {
               parseSizes.forEach(async ({ sizeId, count }) => {
                  const shoesSize = await ShoesSize.findOne({
                     where: { sizeId, shoId: shoes.id },
                  });
                  if (shoesSize) {
                     await ShoesSize.update(
                        { count },
                        { where: { sizeId, shoId: shoes.id } },
                     );
                  } else {
                     await ShoesSize.create({
                        shoId: shoes.id,
                        count,
                        sizeId: sizeId,
                     });
                  }
               });
            }
         }

         return res.json({ message: 'Device is updated' });
      } catch (error) {
         return res.json('Device updating Error ');
      }
   }
}

export default new shoesController();
