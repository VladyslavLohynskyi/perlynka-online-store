import React from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import { RoutesEnum, baseURL } from '../../../../utils/constants';

import './ShoesItem.scss';
import { ShoesItemType } from './ShoesItemType';
import { useNavigate } from 'react-router-dom';

export const ShoesItem: React.FC<ShoesItemType> = ({ shoes }) => {
   const { brands } = useAppSelector((state) => state.shoesReducer);
   const navigate = useNavigate();
   return (
      <div
         className='shoes-item'
         onClick={() => navigate(RoutesEnum.SHOES + '/' + shoes.id)}
      >
         <div className='shoes-item__id'>#{shoes.id}</div>
         <div className='shoes-item__img-container'>
            <img src={baseURL + shoes.img} alt='shoes' />
         </div>
         <div className='shoes-item__info'>
            <p className='shoes-item__model'>
               {brands?.length &&
                  brands.find((brand) => {
                     return Number(brand.id) === shoes.brandId;
                  })?.name}{' '}
               {shoes.model}
            </p>
            <p className='shoes-item__price'>{shoes.price} грн</p>
         </div>
      </div>
   );
};
