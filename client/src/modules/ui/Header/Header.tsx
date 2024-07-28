import React, { useEffect, useRef, useState } from 'react';
import { NavItem } from './components/NavItem';
import {
   faCartShopping,
   faUser,
   faBars,
   faClose,
} from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { IconButton } from '../IconButton';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../utils/constants';
import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';
import { sexFilter } from '../../../store/reducers/filter/FilterActionCreators';
import {
   clearBasketBeforeLogOut,
   getTotalCountOfShoesInBasket,
   getTotalCountOfShoesInBasketNotAuth,
} from '../../../store/reducers/basket/BasketActionCreators';
import { logOutUser } from '../../../store/reducers/user/UserActionCreators';
import { DropdownItem } from './components/DropdownItem';
import HeaderType from './HeaderType';

export const Header: React.FC<HeaderType> = ({
   isBurgerShowed,
   handleSwitchBurgerShow,
}) => {
   const { user, isAuth } = useAppSelector((state) => state.userReducer);
   const { totalCountOfShoesInBasket } = useAppSelector(
      (state) => state.basketReducer,
   );
   const dispatch = useAppDispatch();
   const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
   const navigate = useNavigate();

   const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (isAuth) {
         dispatch(getTotalCountOfShoesInBasket());
      } else {
         dispatch(getTotalCountOfShoesInBasketNotAuth());
      }
   }, []);

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutsideDropdown);
      return () => {
         document.removeEventListener('mousedown', handleClickOutsideDropdown);
      };
   }, []);

   const handleClickOutsideDropdown = (event: MouseEvent) => {
      if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event?.target as Node)
      ) {
         setIsHeaderDropdownOpen(false);
      }
   };
   const handleClickUserIcon = () => {
      if (isAuth) {
         return setIsHeaderDropdownOpen((prev) => !prev);
      }
      return navigate(RoutesEnum.LOGIN);
   };

   const handleClickBasketIcon = () => {
      return navigate(RoutesEnum.BASKET);
   };
   const onClickSex = (sex: SexEnum) => {
      dispatch(sexFilter(sex));
      navigate(RoutesEnum.SHOP);
   };

   const handleClickLogoutButton = () => {
      dispatch(clearBasketBeforeLogOut());
      dispatch(logOutUser());
   };
   return (
      <>
         <div className='header__container'>
            <header className='header'>
               <div className='header__logo-container'>
                  <IconButton
                     icon={isBurgerShowed ? faClose : faBars}
                     className='header__burger-btn'
                     onClick={() => handleSwitchBurgerShow()}
                  />
                  <h1 onClick={() => navigate(RoutesEnum.SHOP)}>Перлинка</h1>
               </div>
               <nav>
                  <NavItem
                     text={SexEnum.BOY}
                     onClick={() => onClickSex(SexEnum.BOY)}
                  />
                  <NavItem
                     text={SexEnum.GIRL}
                     onClick={() => onClickSex(SexEnum.GIRL)}
                  />
                  <NavItem text='Бренди' />
                  <NavItem text='Контакти' />
                  <NavItem text='Доставка' />
               </nav>
               <div className='icon-menu'>
                  <div className='icon-menu__basket'>
                     <IconButton
                        icon={faCartShopping}
                        onClick={handleClickBasketIcon}
                     />
                     <span className='icon-text'>
                        {totalCountOfShoesInBasket}
                     </span>
                  </div>
                  <div className='icon-menu__dropdown' ref={dropdownRef}>
                     <IconButton
                        className='icon-menu__dropdown-btn'
                        icon={faUser}
                        onClick={handleClickUserIcon}
                     />
                     <div
                        className='icon-menu__dropdown-container'
                        style={{
                           display: isHeaderDropdownOpen ? 'block' : 'none',
                        }}
                     >
                        <DropdownItem
                           text='Профіль'
                           onClick={() => {
                              navigate(RoutesEnum.PROFILE);
                              setIsHeaderDropdownOpen(false);
                           }}
                        />
                        {user?.role === 'ADMIN' && (
                           <DropdownItem
                              text='Адмін панель'
                              onClick={() => {
                                 navigate(RoutesEnum.ADMIN);
                                 setIsHeaderDropdownOpen(false);
                              }}
                           />
                        )}
                        <DropdownItem
                           text='Вихід'
                           onClick={() => {
                              handleClickLogoutButton();
                              setIsHeaderDropdownOpen(false);
                           }}
                        />
                     </div>
                  </div>
               </div>
            </header>
         </div>
      </>
   );
};
