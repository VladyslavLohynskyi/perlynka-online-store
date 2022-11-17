import React from 'react';
import './NavItem.scss';
import { NavItemType } from './NavItemType';

export const NavItem: React.FC<NavItemType> = ({ text }) => {
   return <div className='nav-item'>{text}</div>;
};
