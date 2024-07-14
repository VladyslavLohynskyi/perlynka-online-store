import React, { useEffect, useState } from 'react';
import { NavItem } from './components/NavItem';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { IconButton } from '../IconButton';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../utils/constants';
import { Modal } from '../../modal/pages';
import { HeaderDropdown } from '../../modal/components/HeaderDropdown';
import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';
import { sexFilter } from '../../../store/reducers/filter/FilterActionCreators';
import {
   getTotalCountOfShoesInBasket,
   getTotalCountOfShoesInBasketNotAuth,
} from '../../../store/reducers/basket/BasketActionCreators';

export const Header: React.FC = () => {
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const { totalCountOfShoesInBasket } = useAppSelector(
      (state) => state.basketReducer,
   );
   const dispatch = useAppDispatch();
   const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuth) {
         dispatch(getTotalCountOfShoesInBasket());
      } else {
         dispatch(getTotalCountOfShoesInBasketNotAuth());
      }
   }, []);

   const handleClickUserIcon = () => {
      if (isAuth) {
         return setIsHeaderDropdownOpen(true);
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
   return (
      <>
         <div className='header__container'>
            <header className='header'>
               <div className='header__logo-container'>
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
                  <IconButton icon={faUser} onClick={handleClickUserIcon} />
               </div>
            </header>
         </div>
         <Modal
            isModalOpen={isHeaderDropdownOpen}
            onClose={() => setIsHeaderDropdownOpen(false)}
            modalPosition='header-dropdown-position'
         >
            <HeaderDropdown onClose={() => setIsHeaderDropdownOpen(false)} />
         </Modal>
      </>
   );
};
