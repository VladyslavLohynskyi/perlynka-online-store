import React, { useState } from 'react';
import { NavItem } from './components/NavItem';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { IconButton } from '../IconButton';
import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../utils/constants';
import { Modal } from '../../modal/pages';
import { HeaderDropdown } from '../../modal/components/HeaderDropdown';

export const Header: React.FC = () => {
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
   const navigate = useNavigate();
   const handleClickUserIcon = () => {
      if (isAuth) {
         return setIsHeaderDropdownOpen(true);
      }
      return navigate(RoutesEnum.LOGIN);
   };
   return (
      <>
         <header className='header'>
            <div className='header__logo-container'>
               <h1 onClick={() => navigate(RoutesEnum.SHOP)}>Перлинка</h1>
            </div>
            <nav>
               <NavItem text='Хлопчик' />
               <NavItem text='Дівчинка' />
               <NavItem text='Бренди' />
               <NavItem text='Контакти' />
               <NavItem text='Доставка' />
            </nav>
            <div className='icon-menu'>
               <IconButton icon={faCartShopping} />
               <IconButton icon={faUser} onClick={handleClickUserIcon} />
            </div>
         </header>
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
