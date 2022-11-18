import { RoutesEnum } from '../../utils/constants';
import { Main } from '../main/pages/Main';
interface IRoutes {
   path: string;
   Component: React.FC;
}
export const authRoutes: IRoutes[] = [
   {
      path: RoutesEnum.PROFILE,
      Component: Main,
   },
];

export const publicRoutes: IRoutes[] = [
   {
      path: RoutesEnum.SHOP,
      Component: Main,
   },
   {
      path: RoutesEnum.LOGIN,
      Component: Main,
   },
   {
      path: RoutesEnum.REGISTRATION,
      Component: Main,
   },
   {
      path: RoutesEnum.BASKET,
      Component: Main,
   },
];

export const adminRoutes: IRoutes[] = [
   {
      path: RoutesEnum.ADMIN,
      Component: Main,
   },
];
