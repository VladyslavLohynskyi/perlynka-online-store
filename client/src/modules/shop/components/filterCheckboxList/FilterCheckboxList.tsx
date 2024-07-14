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
         <h3 className='filter-header checkbox-list__header '>{name}</h3>
         <div className='checkbox-list__main'>
            {list?.map(({ id, name }) => (
               <FilterCheckboxItem
                  key={id}
                  name={name}
                  id={id}
                  handleClickCheckbox={handleClickCheckbox}
                  selectedValuesId={selectedValuesId}
               />
            ))}
         </div>
      </div>
   );
};
