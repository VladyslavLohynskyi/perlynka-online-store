import React from 'react';
import './NavItem.scss';
import { NavItemType } from './NavItemType';

export const NavItem: React.FC<NavItemType> = ({ text, onClick, type }) => {
   return (
      <div className={'nav-item nav-item__' + type} onClick={onClick}>
         {text}
      </div>
   );
};
