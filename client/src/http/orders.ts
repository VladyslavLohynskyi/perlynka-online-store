import { Interface } from 'readline';
import { $authHost, $host } from '.';
import {
   DeliveryOptionsEnum,
   PaymentOptionsEnum,
} from '../modules/checkout/pages';
import { IBasicCategory, IShoes } from '../store/reducers/shoes/ShoesSlice';
import { OrderFiltersEnum, OrderStatusEnum } from '../utils/constants';
import { IBasicResponse } from './basket';

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

interface IOrder {
   createdAt: string;
   deliveryDescription: string | null;
   deliveryOption: DeliveryOptionsEnum;
   description: string | null;
   email: string;
   id: number;
   name: string;
   paymentOption: PaymentOptionsEnum;
   phone: string;
   settlementAreaDescription: string | null;
   settlementDescription: string | null;
   settlementTypeDescription: string | null;
   status: string;
   surname: string;
   totalPrice: number;
   updatedAt: string;
}

interface IOrderItem {
   id: number;
   orderId: number;
   shoeId: number;
   quantity: number;
   price: number;
   size: number;
}

export interface IShoesWithDetails extends IShoes {
   brand: IBasicCategory;
   season: IBasicCategory;
   color: IBasicCategory;
   type: IBasicCategory;
}

export interface IOrderItemWithShoesDetails extends IOrderItem {
   sho: IShoesWithDetails;
}

export interface IOrderWithItems extends IOrder {
   order_items: IOrderItemWithShoesDetails[];
}

interface IGetOrdersResponse {
   count: number;
   rows: IOrderWithItems[];
}

export interface IOrderInfo {
   price: number;
   basket: IOrderItemCreate[];
}

interface IGetOrderRequest {
   limit: number;
   offset: number;
   status: OrderStatusEnum | 'Всі Статуси';
   email: string;
   phone: string;
   name: string;
   surname: string;
   filterOption: OrderFiltersEnum;
}

interface IGetOrderByUserRequest {
   limit: number;
   offset: number;
   status: OrderStatusEnum | 'Всі Статуси';
   filterOption: OrderFiltersEnum;
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
   getOrdersByAdmin = async (getOrdersByAdminData: IGetOrderRequest) => {
      const { data } = await $authHost.get<IGetOrdersResponse>('/order', {
         params: getOrdersByAdminData,
      });
      return data;
   };
   getOrdersByUser = async (getOrdersByUserData: IGetOrderByUserRequest) => {
      const { data } = await $authHost.get<IGetOrdersResponse>('/order/my', {
         params: getOrdersByUserData,
      });
      return data;
   };
   updateOrderStatus = async (id: number, status: OrderStatusEnum) => {
      const { data } = await $authHost.put<IBasicResponse>('/order/' + id, {
         status,
      });
      return data;
   };
}

export default new OrderReq();
