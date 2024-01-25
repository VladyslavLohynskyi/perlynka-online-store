import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './CheckoutPage.scss';
import {
   getAllShoesOfBasket,
   getAllShoesOfBasketNotAuth,
} from '../../../store/reducers/basket/BasketActionCreators';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';
import { CheckoutItem } from '../components/CheckoutItem';

export const CheckoutPage: React.FC = () => {
   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector((state) => state.userReducer);
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
   }, [totalCountOfShoesInBasket, basket]);
   useEffect(() => {
      if (isAuth) {
         dispatch(getAllShoesOfBasket());
      } else {
         dispatch(getAllShoesOfBasketNotAuth());
      }
   }, []);
   return (
      <div className='checkout'>
         <div className='checkout__main'>
            <h3 className='checkout__page-header'>Оформлення замовлення</h3>
            <div className='checkout__names-columns-container'>
               <div> Фото</div>
               <div>Інформація</div>
               <div>Кількість</div>
               <div>Ціна</div>
               <div>Разом</div>
            </div>
            {basket.length > 0 ? (
               <>
                  {basket.map(({ id, sho, count, size }) => (
                     <CheckoutItem
                        key={id}
                        id={id}
                        shoes={sho}
                        count={+count}
                        size={size}
                     />
                  ))}
               </>
            ) : (
               <p className='checkout__empty-text'>Ваша Корзина Порожня</p>
            )}
         </div>
      </div>
   );
};
