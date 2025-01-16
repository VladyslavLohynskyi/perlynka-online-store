import Shoes, { SexType } from '../models/shoesModel';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';
import ShoesSize from '../models/shoesSizeModel';

import { Op, Sequelize } from 'sequelize';

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
import BasketShoes from '../models/basketShoesModel';
import { sequelize } from '../db';

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
      promotion?: string;
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
      promotionalPrice?: number;
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
      promotionalPrice?: number;
      shoesInfos?: string;
      newShoesInfos?: string;
      deletedShoesInfoIds?: string;
      deletedImagesNames?: string;
      isAvailable?: string;
   };
}

export interface IShoesInfo {
   id: number;
   title: string;
   description: string;
}

class shoesController {
   async create(req: shoesCreateRequest, res: Response, next: NextFunction) {
      const transaction = await sequelize.transaction();
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
            promotionalPrice,
            shoesInfos,
         } = req.body;
         const img = Array.isArray(req.files?.images)
            ? req.files?.images.reverse()
            : req.files?.images;

         if (!img) {
            return next(ApiError.badRequest('Зображень не знайдено'));
         }
         const fileMainName = uuidv4();
         const shoes = await Shoes.create(
            {
               model,
               price,
               brandId,
               typeId,
               colorId,
               seasonId,
               img: fileMainName,
               sex,
               promotionalPrice,
               isAvailable: true,
            },
            { transaction },
         );

         if (!Array.isArray(img)) {
            await fileUploadService.uploadPhoto(
               sharp(img.data.buffer).resize(300, 300).webp(),
               `${fileMainName}`,
               `preview/${shoes.id}`,
            );
            await fileUploadService.uploadPhoto(
               sharp(img.data.buffer).resize(1000, 1000).webp(),
               fileMainName,
               `images/${shoes.id}`,
            );
         } else {
            await fileUploadService.uploadPhoto(
               sharp(img[0].data.buffer).resize(300, 300).webp(),
               `${fileMainName}`,
               `preview/${shoes.id}`,
            );
            await fileUploadService.uploadPhoto(
               sharp(img[0].data.buffer).resize(1000, 1000).webp(),
               fileMainName,
               `images/${shoes.id}`,
            );
         }
         if (Array.isArray(img)) {
            for (let i = 1; i < img.length; i++) {
               const fileName = uuidv4();
               await fileUploadService.uploadPhoto(
                  sharp(img[i].data.buffer).resize(1000, 1000).webp(),
                  fileName,
                  `images/${shoes.id}`,
               );
               await ShoesImage.create(
                  { shoId: shoes.id, img: fileName },
                  { transaction },
               );
            }
         }
         const parseSizes: IParseSizes[] = JSON.parse(sizes);
         if (Array.isArray(parseSizes)) {
            for (const { sizeId, count } of parseSizes) {
               await ShoesSize.create(
                  { sizeId, count, shoId: shoes.id },
                  { transaction },
               );
            }
         }
         if (shoesInfos.length !== 0) {
            const parseInfo = JSON.parse(shoesInfos) as IShoesInfo[];
            for (const element of parseInfo) {
               await ShoesInfo.create(
                  {
                     title: element.title,
                     description: element.description,
                     shoId: shoes.id,
                  },
                  { transaction },
               );
            }
         }
         await transaction.commit();
         return res.json({ message: 'Взуття успішно створене' });
      } catch (error) {
         await transaction.rollback();
         return next(
            ApiError.internalServer(
               'Невідома помилка при створені нового взуття',
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
            promotion,
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

         const whereClause: any = {
            brandId: { [Op.or]: [...brandIdsParsed] },
            typeId: { [Op.or]: [...typeIdsParsed] },
            seasonId: { [Op.or]: [...seasonIdsParsed] },
            colorId: { [Op.or]: [...colorsIdsParsed] },
            sex: { [Op.or]: sexFilter() },
            isAvailable: true,
         };
         if (promotion === 'true') {
            whereClause.promotionalPrice = { [Op.not]: null };
         }
         const shoes = await Shoes.findAndCountAll({
            where: whereClause,
            order: [
               [
                  sortBySplit[0] === 'price'
                     ? Sequelize.literal(
                          `COALESCE("shoes"."promotionalPrice", "shoes"."price")`,
                       )
                     : sortBySplit[0],
                  sortBySplit[1].toUpperCase(),
               ],
            ],
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
            const images = await ShoesImage.findAll({ where: { shoId: +id } });
            await Shoes.destroy({ where: { id: id } });
            await fileUploadService.deleteFile(shoes.img, 'preview');
            await fileUploadService.deleteFile(shoes.img, 'images');
            if (images.length > 0) {
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
      const transaction = await sequelize.transaction();
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
            promotionalPrice,
            shoesInfos,
            newShoesInfos,
            deletedShoesInfoIds,
            deletedImagesNames,
            isAvailable,
         } = req.body;

         const shoes = await Shoes.findOne({ where: { id } });
         if (!shoes) {
            return next(ApiError.notFound(`Взуття з id = ${id} не існує`));
         }

         const isAvailableBool =
            isAvailable === undefined
               ? shoes.isAvailable
               : isAvailable === 'true';

         const img = req.files?.file;
         const additionImages = req.files?.newAdditionImages;
         if (img && !Array.isArray(img)) {
            if (shoes.img) {
               await fileUploadService.deleteFile(
                  shoes.img,
                  'images/' + shoes.id,
               );
               await fileUploadService.deleteFile(
                  shoes.img,
                  'preview/' + shoes.id,
               );
            }
            const newFileName = uuidv4();
            await fileUploadService.uploadPhoto(
               sharp(img.data.buffer).resize(300, 300).webp(),
               newFileName,
               'preview/' + shoes.id,
            );
            await fileUploadService.uploadPhoto(
               sharp(img.data.buffer).resize(1000, 1000).webp(),
               newFileName,
               'images/' + shoes.id,
            );
            await Shoes.update(
               { img: newFileName },
               { where: { id }, transaction },
            );
         }
         await Shoes.update(
            {
               model: model ?? shoes.model,
               price: price ?? shoes.price,
               brandId: brandId ?? shoes.brandId,
               typeId: typeId ?? shoes.typeId,
               colorId: colorId ?? shoes.colorId,
               seasonId: seasonId ?? shoes.seasonId,
               sex: sex ?? shoes.sex,
               promotionalPrice:
                  promotionalPrice !== undefined && promotionalPrice >= 0
                     ? promotionalPrice
                     : null,
               isAvailable: isAvailableBool,
            },
            { where: { id }, transaction },
         );
         if (sizes) {
            const parseSizes: IParseSizes[] = JSON.parse(sizes);
            const sizePromises = parseSizes.map(async ({ sizeId, count }) => {
               const shoesSize = await ShoesSize.findOne({
                  where: { sizeId, shoId: shoes.id },
               });
               if (shoesSize) {
                  if (shoesSize.count !== count) {
                     await ShoesSize.update(
                        { count },
                        { where: { sizeId, shoId: shoes.id }, transaction },
                     );
                  }
               } else {
                  await ShoesSize.create(
                     { shoId: shoes.id, count, sizeId },
                     { transaction },
                  );
               }
            });
            await Promise.all(sizePromises);
         }
         if (shoesInfos) {
            const parseShoesInfos: IShoesInfo[] = JSON.parse(shoesInfos);
            const shoesInfoPromises = parseShoesInfos.map(
               async ({ id, title, description }) => {
                  await ShoesInfo.update(
                     { title, description },
                     { where: { id }, transaction },
                  );
               },
            );
            await Promise.all(shoesInfoPromises);
         }
         if (newShoesInfos) {
            const parseNewShoesInfos: IShoesInfo[] = JSON.parse(newShoesInfos);
            const newShoesInfoPromises = parseNewShoesInfos.map(
               async ({ title, description }) => {
                  await ShoesInfo.create(
                     { title, description, shoId: shoes.id },
                     { transaction },
                  );
               },
            );
            await Promise.all(newShoesInfoPromises);
         }

         if (deletedShoesInfoIds) {
            const parsedDeletedShoesInfoIds: number[] =
               JSON.parse(deletedShoesInfoIds);
            const deletedShoesInfoPromises = parsedDeletedShoesInfoIds.map(
               async (id) => {
                  await ShoesInfo.destroy({
                     where: { id, shoId: shoes.id },
                     transaction,
                  });
               },
            );
            await Promise.all(deletedShoesInfoPromises);
         }

         if (deletedImagesNames) {
            const parsedDeletedImagesNames: string[] =
               JSON.parse(deletedImagesNames);
            const deletedImagesPromises = parsedDeletedImagesNames.map(
               async (element) => {
                  await ShoesImage.destroy({
                     where: { img: element },
                     transaction,
                  });
                  await fileUploadService.deleteFile(
                     element,
                     'images/' + shoes.id,
                  );
               },
            );
            await Promise.all(deletedImagesPromises);
         }
         if (additionImages) {
            const additionImagesArray = Array.isArray(additionImages)
               ? additionImages
               : [additionImages];
            const additionImagePromises = additionImagesArray.map(
               async (el) => {
                  const fileName = uuidv4();
                  await fileUploadService.uploadPhoto(
                     sharp(el.data.buffer).resize(1000, 1000).webp(),
                     fileName,
                     'images/' + shoes.id,
                  );
                  await ShoesImage.create(
                     { shoId: shoes.id, img: fileName },
                     { transaction },
                  );
               },
            );
            await Promise.all(additionImagePromises);
         }
         if (
            isAvailableBool === false &&
            shoes.isAvailable !== isAvailableBool
         ) {
            await BasketShoes.destroy({
               where: { shoId: shoes.id },
               transaction,
            });
         }

         await transaction.commit();
         return res.json({ message: 'Взуття успішно редаговано' });
      } catch (error) {
         await transaction.rollback();
         return next(
            ApiError.internalServer('Невідома помилка при редагуванні взуття'),
         );
      }
   }
}

export default new shoesController();
