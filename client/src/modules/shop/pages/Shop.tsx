import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';

export const Shop: React.FC = () => {
   const { shoes } = useAppSelector((state) => state.shoesReducer);
   return (
      <div className='shop'>
         <div className='shop__container'>
            <aside className='shop__aside-filters'>Фільтри</aside>
            <section className='shop__shoes-list'>
               {shoes &&
                  shoes.map((shoes) => (
                     <ShoesItem key={shoes.id} shoes={shoes} />
                  ))}
            </section>
         </div>
      </div>
   );
};
