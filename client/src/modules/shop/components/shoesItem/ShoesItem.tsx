import React, { useRef, useState } from 'react';
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
   const [isImgLoading, setIsImgLoading] = useState(true);
   const ref = useRef<HTMLImageElement>(null);
   const navigate = useNavigate();
   return (
      <div
         className='shoes-item'
         onClick={() => navigate(RoutesEnum.SHOES + '/' + shoes.id)}
      >
         <div className='shoes-item__img-container'>
            {shoes.promotionalPrice && (
               <div className='shoes-item__discount-tag'>
                  -
                  {Math.round(
                     100 - (shoes.promotionalPrice / shoes.price) * 100,
                  )}
                  %
               </div>
            )}

            <img
               src={`${GOOGLE_CLOUD_STORAGE_BASE_URL}/${GOOGLE_CLOUD_BUCKET_NAME}/preview/${shoes.id}/${shoes.img}.webp`}
               onLoad={() => setIsImgLoading(false)}
               alt='shoes'
               ref={ref}
               style={{
                  aspectRatio: '1/1',
                  display: isImgLoading ? 'none' : undefined,
               }}
            />
            {isImgLoading && <div className='skeleton-item__image'></div>}
            <div className='shoes-item__tags'>
               {shoes.promotionalPrice && (
                  <div className='shoes-item__tag shoes-item__tag--promotional'>
                     Розпродаж
                  </div>
               )}
            </div>
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
               <div className='shoes-item__price'>
                  <p className='preview-shoes-item-price-text'>
                     {shoes.promotionalPrice
                        ? shoes.promotionalPrice
                        : shoes.price}{' '}
                     грн
                  </p>
                  {shoes.promotionalPrice && (
                     <span className='shoes-item__promo-price'>
                        {shoes.price} грн
                     </span>
                  )}
               </div>

               <IconButton
                  className='shoes-item__plus-btn '
                  icon={faPlusCircle}
               />
            </div>
         </div>
      </div>
   );
};
