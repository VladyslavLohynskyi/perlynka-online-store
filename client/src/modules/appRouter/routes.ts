import { RoutesEnum } from '../../utils/constants';
import { Admin } from '../admin';
import Auth from '../auth/Auth';
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
      Component: Shop,
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
      path: RoutesEnum.BASKET,
      Component: Shop,
   },
   {
      path: RoutesEnum.SHOES + '/:id',
      Component: ShoesPage,
   },
];

export const adminRoutes: IRoutes[] = [
   {
      path: RoutesEnum.ADMIN,
      Component: Admin,
   },
];
