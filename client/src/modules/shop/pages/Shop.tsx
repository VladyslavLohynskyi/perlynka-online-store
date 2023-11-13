import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';
import { brandFilter } from '../../../store/reducers/filter/FilterActionCreators';

export const Shop: React.FC = () => {
   const dispatch = useAppDispatch();
   const { shoes, brands } = useAppSelector((state) => state.shoesReducer);
   const { selectedBrandsId } = useAppSelector((state) => state.filterReducer);
   const handleClickCheckbox = (id: number) => {
      dispatch(brandFilter(id));
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
                           onClick={() => handleClickCheckbox(+brand.id)}
                        >
                           <input
                              value={brand.name}
                              type='checkbox'
                              checked={selectedBrandsId.includes(+brand.id)}
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
