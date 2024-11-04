import { Request, Response, NextFunction } from 'express';

import ApiError from '../exceptions/ApiError';
import Order from '../models/orderModel';
import mailService, {
   DeliveryOptionsEnum,
   PaymentOptionsEnum,
} from '../services/mailService';
import OrderItem from '../models/orderItemModel';

interface IOrderItemCreate {
   shoeId: number;
   count: number;
   price: number;
   size: number;
}
interface ICreateOrderRequest extends Request {
   body: {
      totalPrice: number;
      email: string;
      name: string;
      surname: string;
      phone: string;
      paymentOption: PaymentOptionsEnum;
      deliveryOption: DeliveryOptionsEnum;
      deliveryDescription?: string;
      settlementAreaDescription?: string;
      settlementDescription?: string;
      settlementTypeDescription?: string;
      list: IOrderItemCreate[];
   };
}
class OrderController {
   async create(req: ICreateOrderRequest, res: Response, next: NextFunction) {
      try {
         const { list, totalPrice, ...orderData } = req.body;
         const order = await Order.create({
            ...orderData,
            status: 'Очікування прийняття замовлення',
            totalPrice,
         });
         const orderItemsData = list.map((item) => ({
            orderId: order.id,
            shoeId: item.shoeId,
            quantity: item.count,
            price: item.price,
            size: item.size,
         }));
         const orderItems = await OrderItem.bulkCreate(orderItemsData);
         await mailService.sendCheckout(orderData, {
            price: totalPrice,
            basket: [...list],
         });
         return res.json({
            message: 'Замовлення створенно успішно',
            order: { ...order, orderItems },
         });
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при створенні замовлення'),
         );
      }
   }

   async getAll(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при отриманні замовлень'),
         );
      }
   }
   async deleteOne(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при видаленні замовлення'),
         );
      }
   }

   async update(req: Request, res: Response, next: NextFunction) {
      try {
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при оновленні замовлення'),
         );
      }
   }
}

export default new OrderController();
