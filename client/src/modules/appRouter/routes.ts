import { RoutesEnum } from '../../utils/constants';
import { Admin } from '../admin';
import Auth from '../auth/Auth';
import ChangePassword from '../auth/сomponents/ChangePassword/ChangePassword';
import { BasketPage } from '../basket/pages';
import { CheckoutPage } from '../checkout/pages';
import Contact from '../contact/pages/Contact';
import PaymentAndDelivery from '../PaymentAndDelivery/pages/PaymentAndDelivery';
import ReturnAndExchange from '../returnAndExchange/pages/ReturnAndExchange';

import { ShoesPage } from '../shoes/pages';
import { Shop } from '../shop/pages';
interface IRoutes {
   path: string;
   Component: React.FC;
}
export const authRoutes: IRoutes[] = [
   {
      path: RoutesEnum.PROFILE,
      Component: Shop,
   },
   {
      path: RoutesEnum.SHOP,
      Component: Shop,
   },
   {
      path: RoutesEnum.BASKET,
      Component: BasketPage,
   },
   {
      path: RoutesEnum.SHOES + '/:id',
      Component: ShoesPage,
   },
   {
      path: RoutesEnum.CHECKOUT,
      Component: CheckoutPage,
   },
   {
      path: RoutesEnum.CONTACT,
      Component: Contact,
   },
   {
      path: RoutesEnum.PAYMENT_AND_DELIVERY,
      Component: PaymentAndDelivery,
   },
   {
      path: RoutesEnum.RETURN_AND_EXCHANGE,
      Component: ReturnAndExchange,
   },
];

export const publicRoutes: IRoutes[] = [
   {
      path: RoutesEnum.SHOP,
      Component: Shop,
   },
   {
      path: RoutesEnum.LOGIN,
      Component: Auth,
   },
   {
      path: RoutesEnum.REGISTRATION,
      Component: Auth,
   },
   {
      path: RoutesEnum.FORGOT_PASSWORD,
      Component: Auth,
   },
   {
      path: RoutesEnum.BASKET,
      Component: BasketPage,
   },
   {
      path: RoutesEnum.SHOES + '/:id',
      Component: ShoesPage,
   },

   {
      path: RoutesEnum.FORGOT_FORM + '/:id' + '/:token',
      Component: ChangePassword,
   },
   {
      path: RoutesEnum.CHECKOUT,
      Component: CheckoutPage,
   },
   {
      path: RoutesEnum.CONTACT,
      Component: Contact,
   },
   {
      path: RoutesEnum.PAYMENT_AND_DELIVERY,
      Component: PaymentAndDelivery,
   },
   {
      path: RoutesEnum.RETURN_AND_EXCHANGE,
      Component: ReturnAndExchange,
   },
];

export const adminRoutes: IRoutes[] = [
   {
      path: RoutesEnum.ADMIN,
      Component: Admin,
   },
];
