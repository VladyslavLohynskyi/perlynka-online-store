import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';
import {
   brandFilter,
   typeFilter,
   seasonFilter,
   colorFilter,
   resetFilters,
   sortFilter,
} from '../../../store/reducers/filter/FilterActionCreators';
import { FilterCheckboxList } from '../components/filterCheckboxList';
import { FilterSizeCheckboxList } from '../components/filterSizeCheckboxList';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';
import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';
import { SortEnum } from '../../../store/reducers/filter/FilterSlice';

interface ISelectFilterOption {
   id: number;
   text: string;
   sort: string;
}

export const Shop: React.FC = () => {
   const dispatch = useAppDispatch();
   const { shoes, brands, types, seasons, colors } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const {
      selectedBrandsId,
      selectedTypesId,
      selectedSeasonsId,
      selectedColorsId,
      selectedSex,
      selectedSizesId,
      selectedSortFilter,
   } = useAppSelector((state) => state.filterReducer);

   const selectOptions: ISelectFilterOption[] = [
      { id: 1, text: 'За спаданням цін', sort: SortEnum.PRICE_ASC },
      { id: 2, text: 'За зростанням цін', sort: SortEnum.PRICE_DESC },
      { id: 3, text: 'Від новіших моделей', sort: SortEnum.CREATED_AT_ASC },
      { id: 4, text: 'Від давніших моделей', sort: SortEnum.CREATED_AT_DESC },
   ];
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
   const handleClickResetButton = () => {
      dispatch(resetFilters());
   };

   const handleClickSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(sortFilter(e.target.value as SortEnum));
   };
   const isFiltersEmpty =
      !selectedBrandsId.length &&
      !selectedTypesId.length &&
      !selectedSeasonsId.length &&
      !selectedSizesId.length &&
      !selectedColorsId.length &&
      selectedSex === SexEnum.UNISEX &&
      selectedSortFilter === SortEnum.PRICE_ASC;

   return (
      <div className='shop'>
         <div className='shop__top'>
            <div className='shop__reset-filters'>
               <Button
                  buttonClass={
                     !isFiltersEmpty
                        ? ButtonClassEnum.PROFILE
                        : ButtonClassEnum.DISABLE
                  }
                  buttonText='Скинути фільтри'
                  disabled={isFiltersEmpty}
                  buttonClick={handleClickResetButton}
               />
            </div>
            <div className='shop__top-filters'>
               <select
                  name='filters'
                  value={selectedSortFilter}
                  onChange={handleClickSelectSort}
               >
                  {selectOptions.map((option) => (
                     <option key={option.id} value={option.sort}>
                        {option.text}
                     </option>
                  ))}
               </select>
            </div>
         </div>
         <div className='shop__container'>
            <aside className='shop__aside-filters'>
               <FilterCheckboxList
                  selectedValuesId={selectedBrandsId}
                  handleClickCheckbox={handleClickBrandCheckbox}
                  list={brands}
                  name='Виробник'
               />
               <FilterCheckboxList
                  selectedValuesId={selectedTypesId}
                  handleClickCheckbox={handleClickTypeCheckbox}
                  list={types}
                  name='Тип'
               />
               <FilterCheckboxList
                  selectedValuesId={selectedSeasonsId}
                  handleClickCheckbox={handleClickSeasonCheckbox}
                  list={seasons}
                  name='Сезон'
               />
               <FilterCheckboxList
                  selectedValuesId={selectedColorsId}
                  handleClickCheckbox={handleClickColorCheckbox}
                  list={colors}
                  name='Колір'
               />
               <FilterSizeCheckboxList />
            </aside>
            <section className='shop__shoes-list'>
               {shoes.length &&
                  shoes.map((shoes) => (
                     <ShoesItem key={shoes.id} shoes={shoes} />
                  ))}
            </section>
         </div>
      </div>
   );
};
