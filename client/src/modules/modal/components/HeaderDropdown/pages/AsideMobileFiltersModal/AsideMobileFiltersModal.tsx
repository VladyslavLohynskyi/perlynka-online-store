import React from 'react';
import './AsideMobileFiltersModal.scss';

import { ModalHeader } from '../../components/ModalHeader';
import { AsideMobileFiltersModalType } from './AsideMobileFiltersModalType';
import { MobileFilterItem } from '../../components/MobileFilterItem';
import { ResetFiltersButton } from '../../../../../ui/ResetFiltersButton';

export const AsideMobileFiltersModal: React.FC<AsideMobileFiltersModalType> = ({
   onClose,
}) => {
   return (
      <div className='aside-mobile-filters-modal__container'>
         <ModalHeader text={`Фільтри`} onClose={onClose} />
         <div className='aside-mobile-filters-modal__main-container'>
            <MobileFilterItem text='Виробник' onClick={() => {}} />
            <MobileFilterItem text='Тип' onClick={() => {}} />
            <MobileFilterItem text='Сезон' onClick={() => {}} />
            <MobileFilterItem text='Колір' onClick={() => {}} />
            <MobileFilterItem text='Розмір' onClick={() => {}} />
         </div>
         <ResetFiltersButton
            style={{
               margin: '0 20px',
               width: 'auto',
            }}
         />
      </div>
   );
};
