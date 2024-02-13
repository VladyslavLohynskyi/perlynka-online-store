import { Request, Response } from 'express';
import mailService from '../services/mailService';

class CheckoutController {
   async create(req: Request, res: Response) {
      await mailService.sendMail();
      return res.json();
   }
}

export default new CheckoutController();
