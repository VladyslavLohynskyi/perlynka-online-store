import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';
import NewsletterSubscription from '../models/newsletterSubscriptionModel';
import { v4 as uuidv4 } from 'uuid';
import mailService from '../services/mailService';
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
      try {
         const { alt, link } = req.body;

         return res.json({ massage: 'Слайд успішно створений' });
      } catch (error) {
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
      try {
         const { slideId } = req.body;

         return res.json({ massage: 'Слайд успішно видалений' });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка видаленні слайду'),
         );
      }
   }

   async getSlides(req: Request, res: Response, next: NextFunction) {
      try {
         return res.json({ massage: 'Слайди успішно отримано' });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка отримані слайдів'),
         );
      }
   }
}

export default new MainCarouselController();
