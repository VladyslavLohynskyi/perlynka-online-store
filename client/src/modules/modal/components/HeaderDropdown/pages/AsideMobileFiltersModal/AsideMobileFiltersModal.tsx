import React from 'react';
import './AsideMobileFiltersModal.scss';

import { ModalHeader } from '../../components/ModalHeader';
import { AsideMobileFiltersModalType } from './AsideMobileFiltersModalType';

export const AsideMobileFiltersModal: React.FC<AsideMobileFiltersModalType> = ({
   onClose,
}) => {
   return (
      <div className='aside-mobile-filters-modal__container'>
         <ModalHeader text={`Фільтри`} onClose={onClose} />
      </div>
   );
};
