import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';
import NewsletterSubscription from '../models/newsletterSubscriptionModel';
interface ICreateNewsletterSubscriptionRequest extends Request {
   body: {
      email: string;
   };
}
class NewsletterSubscriptionController {
   async create(
      req: ICreateNewsletterSubscriptionRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { email } = req.body;
         const isSubscriptionExist = await NewsletterSubscription.findOne({
            where: { email },
         });
         if (isSubscriptionExist) {
            return res.json({ massage: 'У вас вже підписка активована' });
         }
         await NewsletterSubscription.create({
            email,
         });
         return res.json({ massage: 'Підписка активована' });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка здійснені підписки на листи',
            ),
         );
      }
   }
}

export default new NewsletterSubscriptionController();
