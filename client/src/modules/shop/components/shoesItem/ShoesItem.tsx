import React from 'react';
import { baseURL } from '../../../../utils/constants';

import './ShoesItem.scss';
import { ShoesItemType } from './ShoesItemType';

export const ShoesItem: React.FC<ShoesItemType> = ({ shoes }) => {
   console.log(shoes);
   return (
      <div className='shoes-item'>
         <div className='shoes-item__id'>#{shoes.id}</div>
         <div className='shoes-item__img-container'>
            <img src={baseURL + shoes.img} alt='shoes' />
         </div>
         <div className='shoes-item__info'>
            <p className='shoes-item__model'>
               {shoes.brand.name} {shoes.model}
            </p>
            <p className='shoes-item__price'>{shoes.price} грн</p>
         </div>
      </div>
   );
};
