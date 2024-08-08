import './DescriptionsItem.scss';
import React from 'react';
import { DescriptionsItemType } from './DescriptionsItemType';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HorizontalLine } from '../../../ui/HorizontalLine';
import useWindowSize from '../../../../hooks/useWindowSize';

const DescriptionsItem: React.FC<DescriptionsItemType> = ({
   setDescriptionAccordionActiveName,
   title,
   value,
   descriptionAccordionActiveName,
   children,
}) => {
   const { width } = useWindowSize();
   return (
      <div
         className={`characteristics__description-container max-width ${
            width > 767 && descriptionAccordionActiveName !== value
               ? 'display-none'
               : ''
         }`}
      >
         <div
            className='characteristics__description-title-mobile-container'
            onClick={() => {
               setDescriptionAccordionActiveName(value);
            }}
         >
            <div className='characteristics__description-title-mobile'>
               <h3>{title}</h3>
               <FontAwesomeIcon
                  icon={
                     descriptionAccordionActiveName === value ? faMinus : faPlus
                  }
               />
            </div>
            <HorizontalLine style={{ marginBottom: 0 }} />
         </div>

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
