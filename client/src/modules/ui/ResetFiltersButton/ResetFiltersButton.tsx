import React from 'react';
import { ResetFiltersButtonType } from './ResetFiltersButtonType';

import { useAppDispatch } from '../../../hooks/redux';

import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';
import { SortEnum } from '../../../store/reducers/filter/FilterSlice';
import { Button } from '../Button';
import { ButtonClassEnum } from '../Button/ButtonType';

export const ResetFiltersButton: React.FC<ResetFiltersButtonType> = ({
   selectedBrandsId,
   selectedTypesId,
   selectedSeasonsId,
   selectedColorsId,
   selectedSex,
   selectedSizesId,
   selectedSortFilter,
   handleClickResetButton,
   ...props
}) => {
   const dispatch = useAppDispatch();

   const isFiltersEmpty =
      !selectedBrandsId.length &&
      !selectedTypesId.length &&
      !selectedSeasonsId.length &&
      !selectedSizesId.length &&
      !selectedColorsId.length &&
      selectedSex === SexEnum.UNISEX &&
      selectedSortFilter === SortEnum.CREATED_AT_DESC;

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
