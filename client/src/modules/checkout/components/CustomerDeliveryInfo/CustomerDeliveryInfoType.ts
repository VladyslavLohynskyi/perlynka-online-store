import { ICustomerInfo } from '../../../../http/checkout';

export interface CustomerDeliveryInfoType {
   handleSubmitCheckout: (customerInfo: ICustomerInfo) => void;
}
