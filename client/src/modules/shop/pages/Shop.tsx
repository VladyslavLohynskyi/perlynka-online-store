import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';
import {
   brandFilter,
   typeFilter,
   seasonFilter,
   colorFilter,
} from '../../../store/reducers/filter/FilterActionCreators';
import { FilterCheckboxList } from '../components/filterCheckboxList';
import { FilterSizeCheckboxList } from '../components/filterSizeCheckboxList';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';
import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';

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
   } = useAppSelector((state) => state.filterReducer);
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
   const isFiltersEmpty =
      !selectedBrandsId.length &&
      !selectedTypesId.length &&
      !selectedSeasonsId.length &&
      !selectedSizesId.length &&
      !selectedColorsId.length &&
      selectedSex === SexEnum.UNISEX;

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
               />
            </div>
            <div className='shop__top-filters'></div>
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
