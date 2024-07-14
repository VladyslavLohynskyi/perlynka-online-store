import React from 'react';

import './FilterCheckboxItem.scss';
import { FilterCheckboxItemType } from './FilterCheckboxItemType';

export const FilterCheckboxItem: React.FC<FilterCheckboxItemType> = ({
   handleClickCheckbox,
   selectedValuesId,
   name,
   id,
}) => {
   return (
      <div
         className='checkbox-list__item'
         onClick={() => handleClickCheckbox(+id)}
      >
         <input
            id={name}
            value={name}
            type='checkbox'
            checked={selectedValuesId.includes(+id)}
            onChange={() => {}}
         />
         <span className='filter-title'>{name}</span>
      </div>
   );
};
