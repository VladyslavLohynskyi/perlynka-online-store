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

   return (
      <div className='shop'>
         <div className='shop__top'></div>
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
