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
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../../../ui/IconButton';

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
            <p className='preview-shoes-item-model-text '>
               {brands?.length &&
                  brands.find((brand) => {
                     return Number(brand.id) === shoes.brandId;
                  })?.name}{' '}
               {shoes.model}
            </p>
            <div className='shoes-item__price-container'>
               <p className='preview-shoes-item-price-text'>
                  {shoes.price} грн
               </p>
               <IconButton
                  className='shoes-item__plus-btn '
                  icon={faPlusCircle}
               />
            </div>
         </div>
      </div>
   );
};
