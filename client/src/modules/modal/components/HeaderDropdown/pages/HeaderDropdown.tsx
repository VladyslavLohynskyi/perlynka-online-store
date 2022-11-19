import React from 'react';
import { DropdownItem } from '../components/DropdownItem';
import './HeaderDropdown.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';
import { RoutesEnum } from '../../../../../utils/constants';
import { logOutUser } from '../../../../../store/reducers/user/UserActionCreatores';
import { HeaderDropdownType } from './HeaderDropdownType';

export const HeaderDropdown: React.FC<HeaderDropdownType> = ({ onClose }) => {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector((state) => state.userReducer);
   const navigate = useNavigate();
   const handleClickDropDownItem = (func: () => void) => {
      func();
      onClose();
   };
   return (
      <div className='header-dropdown__container'>
         <DropdownItem
            text='Профіль'
            onClick={() =>
               handleClickDropDownItem(() => navigate(RoutesEnum.PROFILE))
            }
         />
         {user?.role === 'ADMIN' && (
            <DropdownItem
               text='Адмін панель'
               onClick={() =>
                  handleClickDropDownItem(() => navigate(RoutesEnum.ADMIN))
               }
            />
         )}
         <DropdownItem
            text='Вихід'
            onClick={() =>
               handleClickDropDownItem(() => dispatch(logOutUser()))
            }
         />
      </div>
   );
};
