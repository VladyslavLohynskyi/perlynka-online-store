import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, adminRoutes } from './routes';
import { useAppSelector } from '../../hooks/redux';
import { RoutesEnum } from '../../utils/constants';
import React from 'react';
import AppRouterType from './AppRouterType';
import { BurgerMenu } from '../ui/BurgerMenu';
const AppRouter: React.FC<AppRouterType> = ({
   isBurgerShowed,
   handleSwitchBurgerShow,
}) => {
   const { isAuth, user } = useAppSelector((state) => state.userReducer);
   return (
      <>
         {!isBurgerShowed ? (
            <Routes>
               {isAuth
                  ? authRoutes.map(({ path, Component }) => (
                       <Route key={path} path={path} element={<Component />} />
                    ))
                  : publicRoutes.map(({ path, Component }) => (
                       <Route key={path} path={path} element={<Component />} />
                    ))}
               {user?.role === 'ADMIN' &&
                  adminRoutes.map(({ path, Component }) => (
                     <Route key={path} path={path} element={<Component />} />
                  ))}
               <Route
                  path='*'
                  element={<Navigate to={RoutesEnum.SHOP} replace />}
               />
            </Routes>
         ) : (
            <BurgerMenu />
         )}
      </>
   );
};

export default AppRouter;
