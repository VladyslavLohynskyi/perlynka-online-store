import React from 'react';
import { NavItem } from './components/NavItem';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { IconMenuItem } from './components/IconMenuItem';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { logOutUser } from '../../../store/reducers/user/UserActionCreatores';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../utils/constants';

export const Header: React.FC = () => {
   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const navigate = useNavigate();
   const handleClickUserIcon = () => {
      if (isAuth) {
         return dispatch(logOutUser());
      }
      return navigate(RoutesEnum.LOGIN);
   };
   return (
      <header className='header'>
         <div className='header__logo-container'>
            <h1>Перлинка</h1>
         </div>
         <nav>
            <NavItem text='Хлопчик' />
            <NavItem text='Дівчинка' />
            <NavItem text='Бренди' />
            <NavItem text='Контакти' />
            <NavItem text='Доставка' />
         </nav>
         <div className='icon-menu'>
            <IconMenuItem icon={faCartShopping} />
            <IconMenuItem icon={faUser} onClick={handleClickUserIcon} />
         </div>
      </header>
   );
};
