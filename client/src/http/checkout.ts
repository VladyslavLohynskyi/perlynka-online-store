import { $host } from '.';
import { ISizeCategory } from '../store/reducers/shoes/ShoesSlice';

export interface ICustomerInfo {
   email: string;
   name: string;
   surname: string;
   phone: string;
   Description: string;
   SettlementAreaDescription: string;
   SettlementDescription: string;
   SettlementTypeDescription: string;
}
export interface IBasketCheckoutItem {
   modelId: number;
   count: number;
   size: string;
}
export interface IOrderInfo {
   price: number;
   basket: IBasketCheckoutItem[];
}
class CheckoutReq {
   createCheckout = async (
      customerInfo: ICustomerInfo,
      orderInfo: IOrderInfo,
   ) => {
      const { data } = await $host.post<ISizeCategory>('/checkout', {
         customerInfo,
         orderInfo,
      });
      return data;
   };
}

export default new CheckoutReq();
