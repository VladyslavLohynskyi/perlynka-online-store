import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';
import {
   brandFilter,
   typeFilter,
} from '../../../store/reducers/filter/FilterActionCreators';
import { FilterCheckboxList } from '../components/filterCheckboxList';

export const Shop: React.FC = () => {
   const dispatch = useAppDispatch();
   const { shoes, brands, types } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const { selectedBrandsId, selectedTypesId } = useAppSelector(
      (state) => state.filterReducer,
   );
   const handleClickBrandCheckbox = (id: number) => {
      dispatch(brandFilter(id));
   };

   const handleClickTypeCheckbox = (id: number) => {
      dispatch(typeFilter(id));
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
