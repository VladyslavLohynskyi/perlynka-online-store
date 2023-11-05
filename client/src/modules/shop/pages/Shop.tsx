import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';

import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';

export const Shop: React.FC = () => {
   const { shoes, brands } = useAppSelector((state) => state.shoesReducer);
   const [checked, setChecked] = useState<string[]>([]);

   useEffect(() => {
      console.log(checked);
   }, [checked]);

   const handleClickCheckbox = (name: string) => {
      const isChecked = checked.find((el) => el === name);
      if (!isChecked) {
         setChecked((prev) => [...prev, name]);
      } else {
         setChecked((prev) => prev.filter((el) => el !== name));
      }
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
                              checked={checked.includes(brand.name)}
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
