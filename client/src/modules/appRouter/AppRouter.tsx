import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, adminRoutes } from './routes';
import { useAppSelector } from '../../hooks/redux';
import { RoutesEnum } from '../../utils/constants';
import { useEffect, useState } from 'react';
import Alert from '../ui/Alert/Alert';
import { AlertTypeEnum } from '../ui/Alert/AlertType';
const AppRouter = () => {
   const { isAuth, user } = useAppSelector((state) => state.userReducer);
   const { basketReducer } = useAppSelector((state) => state);
   const [showAlertNotification, setShowAlertNotification] =
      useState<boolean>(false);
   const [alertNotificationMessage, setAlertNotificationMessage] =
      useState<string>('');

   const [isErrorNotificationMessage, setIsErrorNotificationMessage] =
      useState<boolean>(false);
   useEffect(() => {
      if (basketReducer.error) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(basketReducer.error);
         setIsErrorNotificationMessage(true);
      }
      if (basketReducer.message) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(basketReducer.message);
         setIsErrorNotificationMessage(false);
      }
   }, [basketReducer.error, basketReducer.message]);
   return (
      <>
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
         <Alert
            type={
               isErrorNotificationMessage
                  ? AlertTypeEnum.DANGER
                  : AlertTypeEnum.SUCCESS
            }
            show={showAlertNotification}
            onClose={() => {
               setShowAlertNotification(false);
               setAlertNotificationMessage('');
            }}
            message={alertNotificationMessage}
         />
      </>
   );
};

export default AppRouter;
