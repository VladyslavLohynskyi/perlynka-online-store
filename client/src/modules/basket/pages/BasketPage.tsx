import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './BasketPage.scss';
import { HorizontalLine } from '../../ui/HorizontalLine';

export const BasketPage: React.FC = () => {
   const dispatch = useAppDispatch();
   const { basket } = useAppSelector((state) => state.basketReducer);
   return (
      <div className='basket'>
         <div className='basket__main'>
            <h3 className='basket__page-header'>Корзина</h3>
            <HorizontalLine />
            <div className='basket__names-columns-container'>
               <div>Фото</div>
               <div>Інформація</div>
               <div>Кількість</div>
               <div>Ціна</div>
               <div>Очистити корзину</div>
            </div>
            <HorizontalLine />
         </div>
      </div>
   );
};
