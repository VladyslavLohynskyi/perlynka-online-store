import React, { useRef } from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import {
   GOOGLE_CLOUD_BUCKET_NAME,
   GOOGLE_CLOUD_STORAGE_BASE_URL,
   RoutesEnum,
} from '../../../../utils/constants';

import './ShoesItem.scss';
import { ShoesItemType } from './ShoesItemType';
import { useNavigate } from 'react-router-dom';

export const ShoesItem: React.FC<ShoesItemType> = ({ shoes }) => {
   const { brands } = useAppSelector((state) => state.shoesReducer);
   const ref = useRef<HTMLImageElement>(null);
   const navigate = useNavigate();
   return (
      <div
         className='shoes-item'
         onClick={() => navigate(RoutesEnum.SHOES + '/' + shoes.id)}
      >
         <div className='shoes-item__img-container'>
            <img
               src={`${GOOGLE_CLOUD_STORAGE_BASE_URL}/${GOOGLE_CLOUD_BUCKET_NAME}/preview/${shoes.img}.webp`}
               loading='lazy'
               alt='shoes'
               ref={ref}
               style={{ height: ref.current?.clientWidth }}
            />
         </div>
         <div className='shoes-item__info'>
            <p className='preview-shoes-item-model-text'>
               {brands?.length &&
                  brands.find((brand) => {
                     return Number(brand.id) === shoes.brandId;
                  })?.name}{' '}
               {shoes.model}
            </p>
            <div>
               <p className='preview-shoes-item-price-text'>
                  {shoes.price} грн
               </p>
               <p className='shoes-item__id preview-shoes-item-price-text'>
                  #{shoes.id}
               </p>
            </div>
         </div>
      </div>
   );
};
