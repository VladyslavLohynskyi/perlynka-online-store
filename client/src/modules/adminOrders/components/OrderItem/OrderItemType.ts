import { IOrderWithItems } from '../../../../http/orders';
import { OrderStatusEnum } from '../../../../utils/constants';

export interface OrderItemType {
   order: IOrderWithItems;
   changeStatus: (id: number, status: OrderStatusEnum) => void;
}
