import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './BasketPage.scss';
import { HorizontalLine } from '../../ui/HorizontalLine';
import {
   deleteAllFromBasket,
   deleteAllFromBasketNotAuth,
   getAllShoesOfBasket,
   getAllShoesOfBasketNotAuth,
} from '../../../store/reducers/basket/BasketActionCreators';
import { BasketItem } from '../components/BasketItem';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../utils/constants';
import { Loader } from '../../ui/Loader';

export const BasketPage: React.FC = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const { isLoadingBasket, basket, totalCountOfShoesInBasket } =
      useAppSelector((state) => state.basketReducer);
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

   const handleClickClearBasket = () => {
      if (isAuth) {
         dispatch(deleteAllFromBasket());
      } else {
         dispatch(deleteAllFromBasketNotAuth());
      }
   };

   const loadBasket = () => {
      if (isLoadingBasket && isAuth)
         return <Loader className='basket__loader' />;
      if (basket.length > 0)
         return (
            <>
               {basket.map(({ id, sho, count, size }) => (
                  <BasketItem
                     key={id}
                     id={id}
                     shoes={sho}
                     count={+count}
                     size={size}
                  />
               ))}
               <div className='basket__order-menu'>
                  <Button
                     buttonText='Оформити Замовлення'
                     buttonClass={ButtonClassEnum.BUY}
                     buttonClick={() => navigate(RoutesEnum.CHECKOUT)}
                  />
                  <p className='basket__order-menu__price'>
                     Всього: {totalPrice} грн.
                  </p>
               </div>
            </>
         );
      return <p className='basket__empty-text'>Корзина Порожня</p>;
   };
   return (
      <div className='basket'>
         <div className='basket__main'>
            <h2 className='basket__page-header'>Корзина</h2>
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
            {loadBasket()}
         </div>
      </div>
   );
};
