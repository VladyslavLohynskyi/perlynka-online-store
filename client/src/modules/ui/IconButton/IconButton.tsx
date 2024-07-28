import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './IconButton.scss';
import { IconButtonType } from './IconButtonType';

export const IconButton: React.FC<IconButtonType> = ({ icon, ...props }) => {
   return (
      <div className={`icon-button `} {...props}>
         <FontAwesomeIcon icon={icon} className='fa-lg' />
      </div>
   );
};
