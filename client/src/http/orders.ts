import { $host } from '.';
import {
   DeliveryOptionsEnum,
   PaymentOptionsEnum,
} from '../modules/checkout/pages';

export interface IOrderItemCreate {
   shoeId: number;
   count: number;
   price: number;
   size: number;
}
export interface ICreateOrderRequest {
   totalPrice: number;
   email: string;
   name: string;
   surname: string;
   phone: string;
   paymentOption: PaymentOptionsEnum;
   deliveryOption: DeliveryOptionsEnum;
   description?: string;
   settlementAreaDescription?: string;
   settlementDescription?: string;
   settlementTypeDescription?: string;
   list: IOrderItemCreate[];
}
export interface ICustomerInfo {
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
}

export interface IOrderInfo {
   price: number;
   basket: IOrderItemCreate[];
}
class OrderReq {
   createCheckout = async (
      customerInfo: ICustomerInfo,
      orderInfo: IOrderInfo,
   ) => {
      const { price, basket } = orderInfo;
      const orderBody: ICreateOrderRequest = {
         ...customerInfo,
         totalPrice: price,
         list: basket,
      };
      const { data } = await $host.post('/order', {
         ...orderBody,
      });
      return data;
   };
}

export default new OrderReq();
