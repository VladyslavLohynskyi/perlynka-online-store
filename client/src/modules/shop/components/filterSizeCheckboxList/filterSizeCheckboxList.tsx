import React from 'react';

import '../filterCheckboxList/FilterCheckboxList.scss';
import { FilterCheckboxItem } from '../filterCheckboxItem';
import { useAppSelector } from '../../../../hooks/redux';

import { filterSizeCheckboxListType } from './filterSizeCheckboxListType';

export const FilterSizeCheckboxList: React.FC<filterSizeCheckboxListType> = ({
   handleClickCheckbox,
   selectedValuesId,
}) => {
   const { sizes } = useAppSelector((state) => state.shoesReducer);
   return (
      <div className='checkbox-list__container'>
         <h3 className='checkbox-list__header filter-header'>Розміри</h3>
         <div className='checkbox-list__main'>
            {sizes?.map(({ id, size }) => (
               <FilterCheckboxItem
                  key={id}
                  name={size + ' EU'}
                  id={id}
                  handleClickCheckbox={handleClickCheckbox}
                  selectedValuesId={selectedValuesId}
               />
            ))}
         </div>
      </div>
   );
};
