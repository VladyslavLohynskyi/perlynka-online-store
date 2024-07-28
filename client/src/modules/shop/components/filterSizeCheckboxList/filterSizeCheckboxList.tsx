import React from 'react';

import '../filterCheckboxList/FilterCheckboxList.scss';
import { FilterCheckboxItem } from '../filterCheckboxItem';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { sizeFilter } from '../../../../store/reducers/filter/FilterActionCreators';

export const FilterSizeCheckboxList: React.FC = () => {
   const { sizes } = useAppSelector((state) => state.shoesReducer);
   const { selectedSizesId } = useAppSelector((state) => state.filterReducer);
   const dispatch = useAppDispatch();
   const handleClickCheckbox = (id: number) => {
      dispatch(sizeFilter(id));
   };
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
                  selectedValuesId={selectedSizesId}
               />
            ))}
         </div>
      </div>
   );
};
