import React, { useState } from 'react';

import './BurgerMenu.scss';
import { NavItem } from '../Header/components/NavItem';
import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { sexFilter } from '../../../store/reducers/filter/FilterActionCreators';
import { RoutesEnum } from '../../../utils/constants';
import { NavItemEnum } from '../Header/components/NavItem/NavItemType';
import BurgerMenuType from './BurgerMenuType';

export const BurgerMenu: React.FC<BurgerMenuType> = ({
   handleSwitchBurgerShow,
}) => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onClickSex = (sex: SexEnum) => {
      dispatch(sexFilter(sex));
      navigate(RoutesEnum.SHOP);
   };
   return (
      <div className='burger-menu__container'>
         <nav>
            <NavItem
               text={SexEnum.BOY}
               onClick={() => {
                  onClickSex(SexEnum.BOY);
                  handleSwitchBurgerShow();
               }}
               type={NavItemEnum.BURGER_MENU_ITEM}
            />
            <NavItem
               text={SexEnum.GIRL}
               onClick={() => {
                  onClickSex(SexEnum.GIRL);
                  handleSwitchBurgerShow();
               }}
               type={NavItemEnum.BURGER_MENU_ITEM}
            />
            <NavItem text='Бренди' type={NavItemEnum.BURGER_MENU_ITEM} />
            <NavItem text='Контакти' type={NavItemEnum.BURGER_MENU_ITEM} />
            <NavItem text='Доставка' type={NavItemEnum.BURGER_MENU_ITEM} />
         </nav>
         <div className='burger-menu__footer'>
            <p className='nav-btn-text'>
               м.Львів, ТВК "Південний", ТЦ Калина 2А
            </p>
         </div>
      </div>
   );
};
