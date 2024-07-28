import React, { useState, useEffect, useMemo } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

import { AddShoesModal } from '../modal/components/HeaderDropdown';
import { EditShoesModal } from '../modal/components/HeaderDropdown/pages/EditShoesModal';

import './Admin.scss';
import { DeleteShoesModal } from '../modal/components/HeaderDropdown/pages/DeleteShoesModal';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
   createBrand,
   deleteBrand,
   updateBrand,
} from '../../store/reducers/shoes/BrandsActionCreators';

import {
   createType,
   deleteType,
   updateType,
} from '../../store/reducers/shoes/TypesActionCreators';
import {
   createSeason,
   deleteSeason,
   updateSeason,
} from '../../store/reducers/shoes/SeasonsActionCreators';
import {
   createColor,
   deleteColor,
   updateColor,
} from '../../store/reducers/shoes/ColorsActionCreators';
import { HorizontalLine } from '../ui/HorizontalLine';
import {
   addAdmin,
   deleteAdmin,
   getAllAdmins,
} from '../../store/reducers/admins/AdminsActionCreators';
import { AdminInfoItem } from './components/AdminInfoItem';
import { BasicInput } from '../ui/BasicInput';
import { debounce } from 'lodash';

import {
   deleteFoundUser,
   getAllUsersByEmail,
} from '../../store/reducers/findUsers/findUsersActionCreators';
import { AdminShoesPanelSection } from './components/AdminShoesPanelSection';
import { AdminBasicPanelSection } from './components/AdminBasicPanelSection';
import { AdminSizePanelSection } from './components/AdminSizePanelSection';

export const Admin: React.FC = () => {
   const { brands, types, seasons, colors } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const { admins, isLoading } = useAppSelector((state) => state.adminsReducer);
   const { foundUsers } = useAppSelector((state) => state.findUsersReducer);
   const [userInputValue, setUserInputValue] = useState('');

   const dispatch = useAppDispatch();
   const changeUserInputValueHandler = (
      e: React.ChangeEvent<HTMLInputElement>,
   ) => {
      setUserInputValue(e.target.value);
   };
   const debounceChangeUserInputValueHandler = useMemo(
      () => debounce(changeUserInputValueHandler, 1000),
      [],
   );

   useEffect(() => {
      dispatch(getAllAdmins());
   }, []);

   useEffect(() => {
      return () => {
         debounceChangeUserInputValueHandler.cancel();
      };
   }, [debounceChangeUserInputValueHandler]);

   useEffect(() => {
      if (userInputValue.length > 2) {
         dispatch(getAllUsersByEmail(userInputValue));
      }
   }, [userInputValue]);

   const handleClickDeleteAdmin = (id: number) => {
      dispatch(deleteAdmin(id)).then(() => {
         dispatch(getAllUsersByEmail(userInputValue));
      });
   };

   const handleClickAddAdmin = (id: number) => {
      dispatch(addAdmin(id)).then(() => {
         dispatch(deleteFoundUser(id));
      });
   };
   return (
      <div className='admin__container'>
         <main className='admin__main'>
            <div className='admin__header-container'>
               <h2> Сторінка Керування Сайтом </h2>
               <HorizontalLine />
            </div>
            <div className='admin__manage-shoes-container'>
               <div className='admin__manage-shoes'>
                  <AdminShoesPanelSection
                     AddModalComponent={AddShoesModal}
                     EditModalComponent={EditShoesModal}
                     DeleteModalComponent={DeleteShoesModal}
                  />
                  <AdminBasicPanelSection
                     header='Бренд'
                     listOfValues={brands}
                     createValue={createBrand}
                     updateValue={updateBrand}
                     deleteValue={deleteBrand}
                  />
                  <AdminBasicPanelSection
                     header='Тип'
                     listOfValues={types}
                     createValue={createType}
                     updateValue={updateType}
                     deleteValue={deleteType}
                  />
                  <AdminBasicPanelSection
                     header='Сезон'
                     listOfValues={seasons}
                     createValue={createSeason}
                     updateValue={updateSeason}
                     deleteValue={deleteSeason}
                  />
                  <AdminBasicPanelSection
                     header='Колір'
                     listOfValues={colors}
                     createValue={createColor}
                     updateValue={updateColor}
                     deleteValue={deleteColor}
                  />
                  <AdminSizePanelSection />
               </div>
            </div>
            <div className='admin__header-container'>
               <h2>Керування Адмінами</h2>
               <HorizontalLine />
            </div>
            <div className='admin__manage-user__container'>
               <div className='admin__manage-user__admins-info'>
                  <h3 className='admin__manage-user__header'>Адміни</h3>
                  {!isLoading &&
                     admins.map((admin) => (
                        <AdminInfoItem
                           key={admin.id}
                           admin={admin}
                           icon={faTrash}
                           onClickButton={() => {
                              handleClickDeleteAdmin(admin.id);
                           }}
                        />
                     ))}
               </div>
               <div className='admin__manage-user__user-search'>
                  <h3 className='admin__manage-user__header'>Додати адміна</h3>
                  <BasicInput
                     onChange={debounceChangeUserInputValueHandler}
                     type='text'
                     placeholder='Введіть пошту користувача'
                  />
                  {foundUsers &&
                     foundUsers.map((user) => (
                        <AdminInfoItem
                           key={user.id}
                           admin={user}
                           icon={faAdd}
                           onClickButton={() => handleClickAddAdmin(user.id)}
                        />
                     ))}
               </div>
            </div>
         </main>
      </div>
   );
};
