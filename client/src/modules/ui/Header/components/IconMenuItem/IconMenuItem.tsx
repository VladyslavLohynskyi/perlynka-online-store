import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './IconMenuItem.scss';
import { IconMenuItemType } from './IconMenuItemType';

export const IconMenuItem: React.FC<IconMenuItemType> = ({ icon, onClick }) => {
   return (
      <div className='icon-menu-item' onClick={onClick}>
         <FontAwesomeIcon icon={icon} className='fa-lg' />
      </div>
   );
};
