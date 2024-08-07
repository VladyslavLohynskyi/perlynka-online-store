import './DescriptionsItem.scss';
import React from 'react';
import { DescriptionsItemType } from './DescriptionsItemType';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DescriptionAccordionNamesEnum } from '../../pages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HorizontalLine } from '../../../ui/HorizontalLine';

const DescriptionsItem: React.FC<DescriptionsItemType> = ({
   setDescriptionAccordionActiveName,
   title,
   value,
   descriptionAccordionActiveName,
   children,
}) => {
   return (
      <div className='characteristics__description-container'>
         <div
            className='characteristics__description-title-mobile'
            onClick={() => {
               setDescriptionAccordionActiveName(value);
            }}
         >
            <h3>{title}</h3>
            <FontAwesomeIcon
               icon={
                  descriptionAccordionActiveName === value ? faMinus : faPlus
               }
            />
         </div>
         <HorizontalLine />
         <div
            className={`characteristics__description ${
               descriptionAccordionActiveName !== value ? 'display-none' : ''
            }`}
         >
            {children}
         </div>
      </div>
   );
};

export default DescriptionsItem;
