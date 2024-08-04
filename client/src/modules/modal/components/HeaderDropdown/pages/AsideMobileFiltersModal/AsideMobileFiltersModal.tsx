import React, { useState } from 'react';
import './AsideMobileFiltersModal.scss';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ModalHeader } from '../../components/ModalHeader';
import { AsideMobileFiltersModalType } from './AsideMobileFiltersModalType';
import { MobileFilterItem } from '../../components/MobileFilterItem';
import { ResetFiltersButton } from '../../../../../ui/ResetFiltersButton';
import { NameOfCategoriesEnum } from '../../../../../shop/pages';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { FilterCheckboxList } from '../../../../../shop/components/filterCheckboxList';
import {
   brandFilter,
   colorFilter,
   seasonFilter,
   typeFilter,
} from '../../../../../../store/reducers/filter/FilterActionCreators';
import { FilterSizeCheckboxList } from '../../../../../shop/components/filterSizeCheckboxList';

export const AsideMobileFiltersModal: React.FC<AsideMobileFiltersModalType> = ({
   onClose,
}) => {
   const dispatch = useAppDispatch();
   const {
      selectedBrandsId,
      selectedTypesId,
      selectedSeasonsId,
      selectedColorsId,
   } = useAppSelector((state) => state.filterReducer);
   const { brands, types, seasons, colors } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const [isFilterOptionClicked, setIsFilterOptionClicked] =
      useState<boolean>(false);
   const [optionNameClicked, setOptionNameClicked] = useState<string>('');

   const handleClickBrandCheckbox = (id: number) => {
      dispatch(brandFilter(id));
   };

   const handleClickTypeCheckbox = (id: number) => {
      dispatch(typeFilter(id));
   };

   const handleClickSeasonCheckbox = (id: number) => {
      dispatch(seasonFilter(id));
   };

   const handleClickColorCheckbox = (id: number) => {
      dispatch(colorFilter(id));
   };

   const switchFiltersCheckboxes = (optionNameClicked: string) => {
      switch (optionNameClicked) {
         case NameOfCategoriesEnum.BRAND:
            return (
               <FilterCheckboxList
                  selectedValuesId={selectedBrandsId}
                  handleClickCheckbox={handleClickBrandCheckbox}
                  list={brands}
               />
            );
         case NameOfCategoriesEnum.TYPE:
            return (
               <FilterCheckboxList
                  selectedValuesId={selectedTypesId}
                  handleClickCheckbox={handleClickTypeCheckbox}
                  list={types}
               />
            );
         case NameOfCategoriesEnum.SEASON:
            return (
               <FilterCheckboxList
                  selectedValuesId={selectedSeasonsId}
                  handleClickCheckbox={handleClickSeasonCheckbox}
                  list={seasons}
               />
            );
         case NameOfCategoriesEnum.COLOR:
            return (
               <FilterCheckboxList
                  selectedValuesId={selectedColorsId}
                  handleClickCheckbox={handleClickColorCheckbox}
                  list={colors}
               />
            );
         case NameOfCategoriesEnum.SIZE:
            return <FilterSizeCheckboxList />;

         default:
            break;
      }
   };
   return (
      <div className='aside-mobile-filters-modal__container'>
         {isFilterOptionClicked ? (
            <>
               <ModalHeader
                  text={optionNameClicked}
                  onClose={() => setIsFilterOptionClicked(false)}
                  icon={faArrowLeft}
               />
               <div className='aside-mobile-filters-modal__main-container'>
                  {switchFiltersCheckboxes(optionNameClicked)}
               </div>
            </>
         ) : (
            <>
               <ModalHeader text={`Фільтри`} onClose={onClose} />
               <div className='aside-mobile-filters-modal__main-container'>
                  <MobileFilterItem
                     text={NameOfCategoriesEnum.BRAND}
                     onClick={() => {
                        setIsFilterOptionClicked(true);
                        setOptionNameClicked(NameOfCategoriesEnum.BRAND);
                     }}
                  />
                  <MobileFilterItem
                     text={NameOfCategoriesEnum.TYPE}
                     onClick={() => {
                        setIsFilterOptionClicked(true);
                        setOptionNameClicked(NameOfCategoriesEnum.TYPE);
                     }}
                  />
                  <MobileFilterItem
                     text={NameOfCategoriesEnum.SEASON}
                     onClick={() => {
                        setIsFilterOptionClicked(true);
                        setOptionNameClicked(NameOfCategoriesEnum.SEASON);
                     }}
                  />
                  <MobileFilterItem
                     text={NameOfCategoriesEnum.COLOR}
                     onClick={() => {
                        setIsFilterOptionClicked(true);
                        setOptionNameClicked(NameOfCategoriesEnum.COLOR);
                     }}
                  />
                  <MobileFilterItem
                     text={NameOfCategoriesEnum.SIZE}
                     onClick={() => {
                        setIsFilterOptionClicked(true);
                        setOptionNameClicked(NameOfCategoriesEnum.SIZE);
                     }}
                  />
               </div>
            </>
         )}
         <ResetFiltersButton
            style={{
               height: '50px',
               margin: '0 20px',
               width: 'auto',
            }}
         />
      </div>
   );
};
