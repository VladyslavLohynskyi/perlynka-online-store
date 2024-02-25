import { Request, Response } from 'express';
import mailService, {
   ICustomerInfo,
   IOrderInfo,
} from '../services/mailService';
interface ICheckoutRequest extends Request {
   body: {
      customerInfo: ICustomerInfo;
      orderInfo: IOrderInfo;
   };
}
class CheckoutController {
   async create(req: ICheckoutRequest, res: Response) {
      const { customerInfo, orderInfo } = req.body;
      await mailService.sendCheckout(customerInfo, orderInfo);
      return res.json({ massage: 'Created Checkout' });
   }
}

export default new CheckoutController();
