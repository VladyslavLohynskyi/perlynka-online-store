import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './BasketPage.scss';
import { HorizontalLine } from '../../ui/HorizontalLine';
import {
   deleteAllFromBasket,
   getAllShoesOfBasket,
} from '../../../store/reducers/basket/BasketActionCreators';
import { BasketItem } from '../components/BasketItem';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';

export const BasketPage: React.FC = () => {
   const dispatch = useAppDispatch();
   const { basket, totalCountOfShoesInBasket } = useAppSelector(
      (state) => state.basketReducer,
   );
   const [totalPrice, setTotalPrice] = useState<number>(0);

   useEffect(() => {
      let price = 0;
      basket.forEach((el) => {
         price += el.count * el.sho.price;
      });
      setTotalPrice(price);
   }, [totalCountOfShoesInBasket]);
   useEffect(() => {
      dispatch(getAllShoesOfBasket());
   }, []);

   const handleClickClearBasket = () => {
      dispatch(deleteAllFromBasket());
   };
   return (
      <div className='basket'>
         <div className='basket__main'>
            <h3 className='basket__page-header'>Корзина</h3>
            <HorizontalLine />
            <div className='basket__names-columns-container'>
               <div> Фото</div>
               <div>Інформація</div>
               <div>Ціна</div>
               <div>Кількість</div>
               <div>Вартість</div>
               <div
                  className='basket__btn-clear-all'
                  onClick={handleClickClearBasket}
               >
                  Очистити корзину
               </div>
            </div>
            <HorizontalLine />
            {basket.length > 0 ? (
               <>
                  {basket.map(({ id, sho, count, size }) => (
                     <BasketItem
                        key={id}
                        id={+id}
                        shoes={sho}
                        count={+count}
                        size={size}
                     />
                  ))}
                  <div className='basket__order-menu'>
                     <Button
                        buttonText='Оформити Замовлення'
                        buttonClass={ButtonClassEnum.BUY}
                     />
                     <p className='basket__order-menu__price'>
                        Всього: {totalPrice} грн.
                     </p>
                  </div>
               </>
            ) : (
               <p className='basket__empty-text'>Корзина Порожня</p>
            )}
         </div>
      </div>
   );
};
