import { FC, useEffect, useState } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Main } from './modules/main/pages/Main';
import {
   getAllShoesByFilter,
   preloadList,
} from './store/reducers/shoes/ShoesActionCreators';
import { authUser } from './store/reducers/user/UserActionCreators';
import { preloadFilter } from './store/reducers/filter/FilterActionCreators';
import { AlertTypeEnum } from './modules/ui/Alert/AlertType';
import Alert from './modules/ui/Alert/Alert';

const App: FC = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.userReducer);
   const shoes = useAppSelector((state) => state.shoesReducer);
   const filter = useAppSelector((state) => state.filterReducer);
   const basket = useAppSelector((state) => state.basketReducer);
   const admin = useAppSelector((state) => state.adminsReducer);
   const [showAlertNotification, setShowAlertNotification] =
      useState<boolean>(false);
   const [alertNotificationMessage, setAlertNotificationMessage] =
      useState<string>('');

   const [isErrorNotificationMessage, setIsErrorNotificationMessage] =
      useState<boolean>(false);
   useEffect(() => {
      if (basket.error) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(basket.error);
         setIsErrorNotificationMessage(true);
      }
      if (basket.message) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(basket.message);
         setIsErrorNotificationMessage(false);
      }
   }, [basket.error, basket.message]);

   useEffect(() => {
      if (shoes.error) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(shoes.error);
         setIsErrorNotificationMessage(true);
      }
      if (shoes.message) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(shoes.message);
         setIsErrorNotificationMessage(false);
      }
   }, [shoes.error, shoes.message]);

   useEffect(() => {
      if (user.message) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(user.message);
         setIsErrorNotificationMessage(false);
      }
   }, [user.message]);

   useEffect(() => {
      if (admin.error) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(admin.error);
         setIsErrorNotificationMessage(true);
      }
      if (admin.message) {
         setShowAlertNotification(true);
         setAlertNotificationMessage(admin.message);
         setIsErrorNotificationMessage(false);
      }
   }, [admin.error, admin.message]);

   useEffect(() => {
      (async () => {
         await dispatch(preloadList());
         dispatch(preloadFilter());
         await dispatch(authUser());
      })();
   }, []);
   useEffect(() => {
      dispatch(
         getAllShoesByFilter({
            brandsId: filter.selectedBrandsId,
            typesId: filter.selectedTypesId,
            seasonsId: filter.selectedSeasonsId,
            colorsId: filter.selectedColorsId,
            sex: filter.selectedSex,
            sizesId: filter.selectedSizesId,
            sortBy: filter.selectedSortFilter,
            limit: filter.limit,
            offset: filter.limit * (filter.page - 1),
         }),
      );
   }, [
      filter.selectedBrandsId,
      filter.selectedTypesId,
      filter.selectedSeasonsId,
      filter.selectedColorsId,
      filter.selectedSex,
      filter.selectedSizesId,
      filter.selectedSortFilter,
      filter.page,
   ]);

   if (user.isLoading) {
      return <div>Loading...</div>;
   }
   return (
      <div className='app'>
         <Main />
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
      </div>
   );
};

export default App;
