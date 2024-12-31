import { Request, Response, NextFunction } from 'express';

import ApiError from '../exceptions/ApiError';
import Order, { OrderAttributes } from '../models/orderModel';
import mailService, {
   DeliveryOptionsEnum,
   PaymentOptionsEnum,
} from '../services/mailService';
import OrderItem from '../models/orderItemModel';
import Shoes from '../models/shoesModel';
import Type from '../models/typeModel';
import Season from '../models/seasonModel';
import Color from '../models/colorModel';
import Brand from '../models/brandModel';
import { json, Op, where, WhereOptions } from 'sequelize';

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

interface IUpdateOrderRequest extends Request {
   body: {
      status: string;
   };
}

interface IGetOrderRequest extends Request {
   query: {
      limit: string;
      offset: string;
      status: string;
      email: string;
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

   async getAll(req: IGetOrderRequest, res: Response, next: NextFunction) {
      try {
         const { limit, offset, status, email } = req.query;
         const whereOptions: WhereOptions<OrderAttributes> = {};
         if (status !== 'Всі Статуси') {
            whereOptions.status = status;
         }

         if (email) {
            whereOptions.email = {
               [Op.like]: `%${email}%`,
            };
         }
         const orders = await Order.findAndCountAll({
            include: [
               {
                  model: OrderItem,
                  include: [
                     {
                        model: Shoes,
                        include: [
                           { model: Type },
                           { model: Season },
                           { model: Color },
                           { model: Brand },
                        ],
                     },
                  ],
               },
            ],
            where: whereOptions,
            order: [['id', 'DESC']],
            distinct: true,
            limit: +limit,
            offset: +offset,
         });
         return res.json(orders);
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

   async updateStatus(
      req: IUpdateOrderRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { id } = req.params;
         const { status } = req.body;
         Order.update({ status }, { where: { id } });
         return res.json({ message: 'Статус замовлення оновлено' });
      } catch (error) {
         return next(
            ApiError.internalServer('Помилка при оновленні замовлення'),
         );
      }
   }
}

export default new OrderController();
