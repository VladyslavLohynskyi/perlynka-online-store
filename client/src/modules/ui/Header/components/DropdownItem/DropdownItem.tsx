import React from 'react';
import { DropdownItemType } from './DropdownItemType';
import './DropdownItem.scss';

export const DropdownItem: React.FC<DropdownItemType> = ({ text, onClick }) => {
   return (
      <div className='dropdown-item__container' onClick={onClick}>
         <p className='filter-header'>{text}</p>
      </div>
   );
};
