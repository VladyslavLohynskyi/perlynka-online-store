import React from 'react';

import './FilterCheckboxItem.scss';
import { FilterCheckboxItemType } from './FilterCheckboxItemType';

export const FilterCheckboxItem: React.FC<FilterCheckboxItemType> = ({
   handleClickCheckbox,
   selectedValuesId,
   value,
}) => {
   return (
      <div
         className='checkbox-list__item'
         onClick={() => handleClickCheckbox(+value.id)}
      >
         <input
            id={value.name}
            value={value.name}
            type='checkbox'
            checked={selectedValuesId.includes(+value.id)}
            onChange={() => {}}
         />
         <span>{value.name}</span>
      </div>
   );
};
