import React from 'react';
import './NavItem.scss';
import { NavItemType } from './NavItemType';

export const NavItem: React.FC<NavItemType> = ({ text, onClick }) => {
   return (
      <div className='nav-item' onClick={onClick}>
         {text}
      </div>
   );
};
