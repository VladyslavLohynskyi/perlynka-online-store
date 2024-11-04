import { ICustomerInfo } from '../../../../http/orders';

export interface CustomerDeliveryInfoType {
   handleSubmitCheckout: (customerInfo: ICustomerInfo) => void;
}
