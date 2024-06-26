import Shoes, { SexType } from '../models/shoesModel';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises } from 'fs';
import { Request, Response } from 'express';
import ShoesSize from '../models/shoesSizeModel';

import { Op, Sequelize, where } from 'sequelize';

import Brand from '../models/brandModel';

import Type from '../models/typeModel';
import Season from '../models/seasonModel';
import Color from '../models/colorModel';
import Size from '../models/sizeModel';
import ShoesInfo from '../models/shoesInfoModel';
import ShoesImage from '../models/shoesImageModel';

interface IParseSizes {
   sizeId: number;
   count: number;
}

enum SortEnum {
   PRICE_ASC = 'price ASC',
   PRICE_DESC = 'price DESC',
   CREATED_AT_ASC = 'createdAt ASC',
   CREATED_AT_DESC = 'createdAt DESC',
}
interface shoesGetRequest extends Request {
   query: {
      brandsId: string;
      typesId: string;
      seasonsId: string;
      colorsId: string;
      sex: SexType;
      sizesId: string;
      sortBy: SortEnum;
      limit: string;
      offset: string;
   };
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
      sex: SexType;
      shoesInfos: string;
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
      sex?: SexType;
      shoesInfos?: string;
      newShoesInfos: string;
      deletedShoesInfoIds: string;
   };
}

export interface IShoesInfo {
   id: number;
   title: string;
   description: string;
}

class shoesController {
   async create(req: shoesCreateRequest, res: Response) {
      try {
         const {
            model,
            price,
            brandId,
            typeId,
            colorId,
            seasonId,
            sizes,
            sex,
            shoesInfos,
         } = req.body;
         const img = req.files?.images;
         if (!img) {
            return res.json('Error: Upload file');
         }
         const fileMainName = uuidv4() + '.jpg';
         if (!Array.isArray(img)) {
            await img.mv(path.resolve(__dirname, '..', 'static', fileMainName));
         } else {
            await img[img.length - 1].mv(
               path.resolve(__dirname, '..', 'static', fileMainName),
            );
         }
         const shoes = await Shoes.create({
            model,
            price,
            brandId,
            typeId,
            colorId,
            seasonId,
            img: fileMainName,
            sex,
         });

         if (Array.isArray(img)) {
            for (let i = img.length - 2; i >= 0; i--) {
               const fileName = uuidv4() + '.jpg';
               await img[i].mv(
                  path.resolve(__dirname, '..', 'static', fileName),
               );
               await ShoesImage.create({ shoId: shoes.id, img: fileName });
            }
         }
         const parseSizes: IParseSizes[] = JSON.parse(sizes);
         if (Array.isArray(parseSizes)) {
            parseSizes.map(({ sizeId, count }) =>
               ShoesSize.create({ sizeId, count, shoId: shoes.id }),
            );
         }
         if (shoesInfos.length != 0) {
            const parseInfo = JSON.parse(shoesInfos) as IShoesInfo[];
            parseInfo.map((element) => {
               ShoesInfo.create({
                  title: element.title,
                  description: element.description,
                  shoId: shoes.id,
               });
            });
         }
         return res.json(shoes);
      } catch (error) {
         res.json('Shoes creating Error ');
      }
   }

   async getAll(req: shoesGetRequest, res: Response) {
      try {
         const {
            brandsId,
            typesId,
            seasonsId,
            colorsId,
            sex,
            sizesId,
            sortBy,
            limit,
            offset,
         } = req.query;
         const brandIdsParsed: string[] = JSON.parse(brandsId);
         const typeIdsParsed: string[] = JSON.parse(typesId);
         const seasonIdsParsed: string[] = JSON.parse(seasonsId);
         const colorsIdsParsed: string[] = JSON.parse(colorsId);
         const sizesIdsParsed: string[] = JSON.parse(sizesId);
         const sexFilter = () => {
            if (sex === 'Хлопчик') {
               return ['Хлопчик', 'Унісекс'];
            }
            if (sex === 'Дівчинка') {
               return ['Дівчинка', 'Унісекс'];
            }
            return [];
         };

         const sortBySplit: string[] = sortBy.split(' ');

         const shoes = await Shoes.findAndCountAll({
            where: {
               brandId: { [Op.or]: [...brandIdsParsed] },
               typeId: { [Op.or]: [...typeIdsParsed] },
               seasonId: { [Op.or]: [...seasonIdsParsed] },
               colorId: { [Op.or]: [...colorsIdsParsed] },
               sex: { [Op.or]: sexFilter() },
            },
            order: [[sortBySplit[0], sortBySplit[1]]],
            include: [
               {
                  model: ShoesSize,
                  where: { sizeId: { [Op.or]: [...sizesIdsParsed] } },
               },
            ],
            distinct: true,
            limit: +limit,
            offset: +offset,
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
            include: [
               { model: ShoesSize, include: [{ model: Size }] },
               { model: Brand },
               { model: Type },
               { model: Season },
               { model: Color },
               {
                  model: ShoesInfo,
               },
            ],
         });
         if (!shoes) {
            return res
               .status(403)
               .json(`Shoes with this id = ${id} doesn't exist`);
         }
         return res.json(shoes);
      } catch (error) {
         res.json('Getting One Error');
      }
   }

   async update(req: shoesUpdateRequest, res: Response) {
      try {
         const {
            id,
            model,
            price,
            brandId,
            typeId,
            colorId,
            seasonId,
            sizes,
            sex,
            shoesInfos,
            newShoesInfos,
            deletedShoesInfoIds,
         } = req.body;
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
               sex: sex ? sex : shoes.sex,
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
                  if (shoesSize && shoesSize.count !== count) {
                     await ShoesSize.update(
                        { count },
                        { where: { sizeId, shoId: shoes.id } },
                     );
                  }
                  if (shoesSize?.count !== count) {
                     await ShoesSize.create({
                        shoId: shoes.id,
                        count,
                        sizeId: sizeId,
                     });
                  }
               });
            }
         }

         if (shoesInfos) {
            const parseShoesInfos: IShoesInfo[] = JSON.parse(shoesInfos);
            if (Array.isArray(parseShoesInfos)) {
               parseShoesInfos.forEach(async ({ id, title, description }) => {
                  await ShoesInfo.update(
                     { title, description },
                     { where: { id } },
                  );
               });
            }
         }

         if (newShoesInfos) {
            const parseNewShoesInfos: IShoesInfo[] = JSON.parse(newShoesInfos);
            if (Array.isArray(parseNewShoesInfos)) {
               parseNewShoesInfos.forEach(async ({ title, description }) => {
                  await ShoesInfo.create({
                     title,
                     description,
                     shoId: shoes.id,
                  });
               });
            }
         }

         if (deletedShoesInfoIds) {
            const parsedDeletedShoesInfoIds: number[] =
               JSON.parse(deletedShoesInfoIds);
            if (Array.isArray(parsedDeletedShoesInfoIds)) {
               parsedDeletedShoesInfoIds.forEach(async (id) => {
                  await ShoesInfo.destroy({
                     where: {
                        id,
                        shoId: shoes.id,
                     },
                  });
               });
            }
         }
         return res.json({ message: 'Shoes is updated' });
      } catch (error) {
         return res.json('Shoes updating Error ');
      }
   }
}

export default new shoesController();
