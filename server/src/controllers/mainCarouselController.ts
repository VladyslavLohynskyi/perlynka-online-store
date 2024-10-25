import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';
import MainCarouselSlide from '../models/mainCarouselSlideModel';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../db';
import fileUploadService from '../services/fileUploadService';
import sharp from 'sharp';
interface ICreateSlideRequest extends Request {
   body: {
      alt: string;
      link: string | null;
   };
}

interface IDeleteSlideRequest extends Request {
   body: {
      slideId: string;
   };
}
class MainCarouselController {
   async createSlide(
      req: ICreateSlideRequest,
      res: Response,
      next: NextFunction,
   ) {
      const transaction = await sequelize.transaction();
      try {
         const { alt, link } = req.body;
         const img = req.files?.images;
         if (Array.isArray(img) || !img) {
            return next(ApiError.badRequest('Додайте лише одне фото'));
         }
         const fileName = uuidv4();
         const slide = await MainCarouselSlide.create(
            {
               alt,
               link,
               img: fileName,
            },
            { transaction },
         );

         const url = await fileUploadService.uploadPhoto(
            sharp(img.data.buffer).resize(700, 465).webp(),
            fileName,
            'main-carousel/' + slide.id,
         );
         await transaction.commit();
         return res.json({ message: 'Слайд успішно створений', slide, url });
      } catch (error) {
         await transaction.rollback();

         if (error instanceof ApiError) {
            return next(error);
         }
         return next(
            ApiError.internalServer('Невідома помилка створенні слайду'),
         );
      }
   }
   async deleteSlide(
      req: IDeleteSlideRequest,
      res: Response,
      next: NextFunction,
   ) {
      const transaction = await sequelize.transaction();
      try {
         const { id } = req.params;
         const slide = await MainCarouselSlide.findOne({
            where: { id: +id },
         });
         console.log(slide);
         if (!slide) {
            return next('Слайд з таким id не існує');
         }
         await MainCarouselSlide.destroy({
            where: { id: slide.id },
            transaction,
         });
         await fileUploadService.deleteFile(
            slide.img,
            'main-carousel/' + slide.id,
         );
         await transaction.commit();
         return res.json({ message: 'Слайд успішно видалений' });
      } catch (error) {
         await transaction.rollback();
         return next(
            ApiError.internalServer('Невідома помилка видаленні слайду'),
         );
      }
   }

   async getSlides(req: Request, res: Response, next: NextFunction) {
      try {
         const slides = await MainCarouselSlide.findAll();
         return res.json({ message: 'Слайди успішно отримано', slides });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка отримані слайдів'),
         );
      }
   }
}

export default new MainCarouselController();
