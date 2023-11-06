import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';
import { brandFilter } from '../../../store/reducers/filter/FilterActionCreators';

export const Shop: React.FC = () => {
   const dispatch = useAppDispatch();
   const { shoes, brands } = useAppSelector((state) => state.shoesReducer);
   const { selectedBrands } = useAppSelector((state) => state.filterReducer);
   const handleClickCheckbox = (name: string) => {
      dispatch(brandFilter(name));
   };
   return (
      <div className='shop'>
         <div className='shop__top'></div>
         <div className='shop__container'>
            <aside className='shop__aside-filters'>
               <div className='checkbox-list__container'>
                  <h3 className='checkbox-list__header'>Виробник</h3>
                  <div className='checkbox-list__main'>
                     {brands?.map((brand) => (
                        <div
                           className='checkbox-list__item'
                           key={brand.id}
                           onClick={() => handleClickCheckbox(brand.name)}
                        >
                           <input
                              value={brand.name}
                              type='checkbox'
                              checked={selectedBrands.includes(brand.name)}
                              onChange={() => {}}
                           />
                           <span>{brand.name}</span>
                        </div>
                     ))}
                  </div>
               </div>
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
