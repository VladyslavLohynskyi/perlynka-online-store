import React from 'react';
import { NavItem } from './components/NavItem';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import { IconMenuItem } from './components/IconMenuItem';

export const Header: React.FC = () => {
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
            <IconMenuItem icon={faUser} />
         </div>
      </header>
   );
};
