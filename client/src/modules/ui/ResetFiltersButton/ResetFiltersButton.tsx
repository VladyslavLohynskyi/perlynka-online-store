import React from 'react';
import { ResetFiltersButtonType } from './ResetFiltersButtonType';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { resetFilters } from '../../../store/reducers/filter/FilterActionCreators';
import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';
import { SortEnum } from '../../../store/reducers/filter/FilterSlice';
import { Button } from '../Button';
import { ButtonClassEnum } from '../Button/ButtonType';

export const ResetFiltersButton: React.FC<ResetFiltersButtonType> = ({
   ...props
}) => {
   const dispatch = useAppDispatch();
   const {
      selectedBrandsId,
      selectedTypesId,
      selectedSeasonsId,
      selectedColorsId,
      selectedSex,
      selectedSizesId,
      selectedSortFilter,
   } = useAppSelector((state) => state.filterReducer);

   const isFiltersEmpty =
      !selectedBrandsId.length &&
      !selectedTypesId.length &&
      !selectedSeasonsId.length &&
      !selectedSizesId.length &&
      !selectedColorsId.length &&
      selectedSex === SexEnum.UNISEX &&
      selectedSortFilter === SortEnum.PRICE_ASC;

   const handleClickResetButton = () => {
      dispatch(resetFilters());
   };
   return (
      <Button
         buttonClass={
            !isFiltersEmpty ? ButtonClassEnum.BUY : ButtonClassEnum.DISABLE
         }
         buttonText='Скинути фільтри'
         disabled={isFiltersEmpty}
         buttonClick={handleClickResetButton}
         {...props}
      />
   );
};
