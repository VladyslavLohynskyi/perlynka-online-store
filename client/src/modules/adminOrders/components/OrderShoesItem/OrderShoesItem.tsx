import React, { useEffect, useState } from 'react';

import './OrderShoesItem.scss';
import { IOrderShoesItemType } from './OrderShoesItemType';
import { useNavigate } from 'react-router-dom';
import {
   GOOGLE_CLOUD_BUCKET_NAME,
   GOOGLE_CLOUD_STORAGE_BASE_URL,
   RoutesEnum,
} from '../../../../utils/constants';

export const OrderShoesItem: React.FC<IOrderShoesItemType> = ({
   orderShoesItem,
}) => {
   const navigate = useNavigate();
   return (
      <div className='order-shoes-item__container'>
         <div className='order-shoes-item__info-shoes-container'>
            <div
               className='order-shoes-item__img-container'
               onClick={() =>
                  navigate(RoutesEnum.SHOES + '/' + orderShoesItem.shoeId)
               }
            >
               <img
                  src={`${GOOGLE_CLOUD_STORAGE_BASE_URL}/${GOOGLE_CLOUD_BUCKET_NAME}/preview/${orderShoesItem.sho.img}.webp`}
                  alt='shoes'
               />
            </div>
            <div>
               <p
                  className='order-shoes-item__main-info sort-title-text'
                  onClick={() =>
                     navigate(RoutesEnum.SHOES + '/' + orderShoesItem.shoeId)
                  }
               >
                  {orderShoesItem.sho.type.name} {orderShoesItem.sho.brand.name}{' '}
                  {orderShoesItem.sho.model}
               </p>
               <p className='order-shoes-item__size-text label-text'>
                  Розмір: {orderShoesItem.size} EU
               </p>
            </div>
         </div>
         <div className='order-shoes-item__buy-counter'>
            <div className='order-shoes-item__buy-number'>
               <p>{orderShoesItem.quantity}</p>
            </div>
         </div>
         <div className='label-text'>{orderShoesItem.price} грн.</div>
         <div className='label-text'>
            {orderShoesItem.price * orderShoesItem.quantity} грн.
         </div>
      </div>
   );
};
