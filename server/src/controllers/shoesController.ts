import Shoes, { SexType } from '../models/shoesModel';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises } from 'fs';
import { NextFunction, Request, Response } from 'express';
import ShoesSize from '../models/shoesSizeModel';

import { Op } from 'sequelize';

import Brand from '../models/brandModel';

import Type from '../models/typeModel';
import Season from '../models/seasonModel';
import Color from '../models/colorModel';
import Size from '../models/sizeModel';
import ShoesInfo from '../models/shoesInfoModel';
import ShoesImage from '../models/shoesImageModel';
import ApiError from '../exceptions/ApiError';
import sharp from 'sharp';

import fileUploadService from '../services/fileUploadService';

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
      newShoesInfos?: string;
      deletedShoesInfoIds?: string;
      deletedImagesNames?: string;
   };
}

export interface IShoesInfo {
   id: number;
   title: string;
   description: string;
}

class shoesController {
   async create(req: shoesCreateRequest, res: Response, next: NextFunction) {
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
            return next(ApiError.badRequest('Зображень не знайдено'));
         }
         const fileMainName = uuidv4();
         if (!Array.isArray(img)) {
            fileUploadService.uploadPhoto(
               sharp(img.data.buffer).resize(300, 300).webp(),
               fileMainName,
               'preview',
            );

            fileUploadService.uploadPhoto(
               sharp(img.data.buffer).resize(1000, 1000).webp(),
               fileMainName,
               'images',
            );
         } else {
            fileUploadService.uploadPhoto(
               sharp(img[img.length - 1].data.buffer)
                  .resize(300, 300)
                  .webp(),
               fileMainName,
               'preview',
            );

            fileUploadService.uploadPhoto(
               sharp(img[img.length - 1].data.buffer)
                  .resize(1000, 1000)
                  .webp(),
               fileMainName,
               'images',
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
               const fileName = uuidv4();
               fileUploadService.uploadPhoto(
                  sharp(img[i].data.buffer).resize(1000, 1000).webp(),
                  fileMainName,
                  'images',
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
         return res.json({ message: 'Взуття успішно створене' });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при створені нового взуття ',
            ),
         );
      }
   }

   async getAll(req: shoesGetRequest, res: Response, next: NextFunction) {
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
         return next(
            ApiError.internalServer(
               'Невідома помилка при отриманні взуття з фільтрацією',
            ),
         );
      }
   }

   async deleteOne(req: Request, res: Response, next: NextFunction) {
      try {
         const { id } = req.params;
         const shoes = await Shoes.findOne({ where: { id: id } });
         if (shoes) {
            await ShoesSize.destroy({ where: { shoId: id } });
            await Shoes.destroy({ where: { id: id } });
            await fileUploadService.deleteFile(shoes.img, 'preview');
            await fileUploadService.deleteFile(shoes.img, 'images');
            const images = await ShoesImage.findAll({ where: { id } });
            if (images.length > 0) {
               await ShoesImage.destroy({ where: { id } });
               images.forEach((el) =>
                  fileUploadService.deleteFile(el.img, 'images'),
               );
            }
            return res.json({ message: 'Взуття успішно видалене' });
         } else {
            return next(ApiError.notFound(`Взуття з id = ${id} не існує`));
         }
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при видалені взуття'),
         );
      }
   }

   async getOne(req: Request, res: Response, next: NextFunction) {
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
               { model: ShoesImage },
            ],
         });
         if (!shoes) {
            return next(ApiError.notFound(`Взуття з id = ${id} не існує`));
         }
         return res.json(shoes);
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при отриманні конкретного взуття',
            ),
         );
      }
   }

   async update(req: shoesUpdateRequest, res: Response, next: NextFunction) {
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
            deletedImagesNames,
         } = req.body;
         const shoes = await Shoes.findOne({ where: { id } });
         if (!shoes) {
            return next(ApiError.notFound(`Взуття з id = ${id} не існує`));
         }
         const img = req.files?.file;
         const additionImages = req.files?.newAdditionImages;
         if (!Array.isArray(img) && img) {
            await promises.unlink(
               path.resolve(__dirname, '..', 'static', shoes.img + '.webp'),
            );
            await promises.unlink(
               path.resolve(
                  __dirname,
                  '..',
                  'static',
                  shoes.img + '-preview.webp',
               ),
            );
            await sharp(img.data.buffer)
               .resize(300, 300)
               .webp()
               .toFile(
                  path.resolve(
                     __dirname,
                     '..',
                     'static',
                     shoes.img + '-preview.webp',
                  ),
               );
            await sharp(img.data.buffer)
               .resize(1000, 1000)
               .webp()
               .toFile(
                  path.resolve(__dirname, '..', 'static', shoes.img + '.webp'),
               );
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

         if (deletedImagesNames) {
            const parsedDeletedImagesNames: string[] =
               JSON.parse(deletedImagesNames);
            parsedDeletedImagesNames.forEach(async (element) => {
               await ShoesImage.destroy({ where: { img: element } });
               await promises.unlink(
                  path.resolve(__dirname, '..', 'static', element + '.webp'),
               );
            });
         }

         if (additionImages) {
            if (Array.isArray(additionImages)) {
               additionImages.forEach(async (el) => {
                  const fileName = uuidv4();
                  await sharp(el.data.buffer)
                     .resize(1000, 1000)
                     .webp()
                     .toFile(
                        path.resolve(
                           __dirname,
                           '..',
                           'static',
                           fileName + '.webp',
                        ),
                     );
                  await ShoesImage.create({ shoId: shoes.id, img: fileName });
               });
            } else {
               const fileName = uuidv4();
               await sharp(additionImages.data.buffer)
                  .resize(1000, 1000)
                  .webp()
                  .toFile(
                     path.resolve(
                        __dirname,
                        '..',
                        'static',
                        fileName + '.webp',
                     ),
                  );
               await ShoesImage.create({ shoId: shoes.id, img: fileName });
            }
         }
         return res.json({ message: 'Взуття успішно редаговано' });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при редагуванні взуття '),
         );
      }
   }
}

export default new shoesController();
