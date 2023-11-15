import React from 'react';

import './FilterCheckboxList.scss';
import { FilterCheckboxListType } from './FilterCheckboxListType';
import { FilterCheckboxItem } from '../filterCheckboxItem';

export const FilterCheckboxList: React.FC<FilterCheckboxListType> = ({
   list,
   name,
   handleClickCheckbox,
   selectedValuesId,
}) => {
   return (
      <div className='checkbox-list__container'>
         <h3 className='checkbox-list__header'>{name}</h3>
         <div className='checkbox-list__main'>
            {list?.map((value) => (
               <FilterCheckboxItem
                  value={value}
                  handleClickCheckbox={handleClickCheckbox}
                  selectedValuesId={selectedValuesId}
               />
            ))}
         </div>
      </div>
   );
};
