import React from 'react';
import './MobileFilterItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MobileFilterItemType } from './MobileFilterItemType';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const MobileFilterItem: React.FC<MobileFilterItemType> = ({
   text,
   onClick,
}) => {
   return (
      <div className='mobile-filter-item__container' onClick={onClick}>
         <h3>{text}</h3>
         <FontAwesomeIcon icon={faChevronRight} />
      </div>
   );
};
