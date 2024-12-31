export const baseURL = process.env.REACT_APP_BACKEND_URL + '/';
export enum RoutesEnum {
   SHOP = '/shop',
   LOGIN = '/login',
   REGISTRATION = '/registration',
   BASKET = '/basket',
   PROFILE = '/profile',
   ADMIN = '/admin',
   SHOES = '/shoes',
   CHECKOUT = '/checkout',
   FORGOT_PASSWORD = '/forgot-password',
   FORGOT_FORM = '/forgot-form',
   CONTACT = '/contact',
   PAYMENT_AND_DELIVERY = '/payment-and-delivery',
   RETURN_AND_EXCHANGE = '/return-and-exchange',
   DISCOUNT = '/discount',
   ADMIN_ORDERS = '/admin-orders',
}

export const limitGettingShoesFromDB = 16;

export const GOOGLE_CLOUD_STORAGE_BASE_URL =
   process.env.REACT_APP_GOOGLE_CLOUD_STORAGE_BASE_URL;
export const GOOGLE_CLOUD_BUCKET_NAME =
   process.env.REACT_APP_GOOGLE_CLOUD_BUCKET_NAME;

export const phoneNumberPattern = /^380\d{9}$/;

export enum OrderStatusEnum {
   PENDING = 'Очікування прийняття замовлення',
   ACCEPTED = 'Замовлення прийнято',
   COMPLETED = 'Замовлення виконано',
   CANCELED = 'Замовлення скасовано',
   DELIVERED = 'Замовлення доставлено',
   RETURNED = 'Замовлення повернуто',
   SENT = 'Замовлення надіслано',
}

export enum OrderFiltersEnum {
   DATE_ASC = 'Фільтрація по даті (від давнішої)',
   DATE_DESC = 'Фільтрація по даті (від новішої)',
}

export const OrderStatusOptions: { id: number; name: OrderStatusEnum }[] = [
   { id: 1, name: OrderStatusEnum.PENDING },
   { id: 2, name: OrderStatusEnum.ACCEPTED },
   { id: 3, name: OrderStatusEnum.COMPLETED },
   { id: 4, name: OrderStatusEnum.CANCELED },
   { id: 5, name: OrderStatusEnum.DELIVERED },
   { id: 6, name: OrderStatusEnum.RETURNED },
   { id: 7, name: OrderStatusEnum.SENT },
];

export const OrderFilterOptions: { id: number; name: OrderFiltersEnum }[] = [
   { id: 2, name: OrderFiltersEnum.DATE_DESC },
   { id: 1, name: OrderFiltersEnum.DATE_ASC },
];
