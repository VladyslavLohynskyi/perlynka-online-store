import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './IconButton.scss';
import { IconButtonType } from './IconButtonType';

export const IconButton: React.FC<IconButtonType> = ({ icon, onClick }) => {
   return (
      <div className='icon-button' onClick={onClick}>
         <FontAwesomeIcon icon={icon} className='fa-lg' />
      </div>
   );
};
