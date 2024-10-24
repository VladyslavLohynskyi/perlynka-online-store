export const baseURL = '/';
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
}

export const limitGettingShoesFromDB = 16;

export const GOOGLE_CLOUD_STORAGE_BASE_URL =
   process.env.REACT_APP_GOOGLE_CLOUD_STORAGE_BASE_URL;
export const GOOGLE_CLOUD_BUCKET_NAME =
   process.env.REACT_APP_GOOGLE_CLOUD_BUCKET_NAME;

export const phoneNumberPattern = /^380\d{9}$/;
