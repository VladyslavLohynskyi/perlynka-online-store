import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './IconMenuItem.scss';
import { IconMenuItemType } from './IconMenuItemType';

export const IconMenuItem: React.FC<IconMenuItemType> = ({ icon }) => {
   return (
      <div className='icon-menu-item'>
         <FontAwesomeIcon icon={icon} className='fa-lg' />
      </div>
   );
};
