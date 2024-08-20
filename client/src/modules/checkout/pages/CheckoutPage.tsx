import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './CheckoutPage.scss';
import {
   deleteAllFromBasket,
   deleteAllFromBasketNotAuth,
   getAllShoesOfBasket,
   getAllShoesOfBasketNotAuth,
} from '../../../store/reducers/basket/BasketActionCreators';
import { CheckoutItem } from '../components/CheckoutItem';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import CheckoutReq, {
   IBasketCheckoutItem,
   ICustomerInfo,
   IOrderInfo,
} from '../../../http/checkout';
import { CheckoutSuccess } from '../components/CheckoutSuccess';
import { CustomerDeliveryInfo } from '../components/CustomerDeliveryInfo';
import { Loader } from '../../ui/Loader';
export enum DeliveryOptionsEnum {
   NOVA_POST = 'У відділення Нової пошти',
   SELF_DELIVERY = 'Самовивіз з магазину',
}

export enum PaymentOptionsEnum {
   CARD_DETAILS = 'Онлайн оплата по реквізитах',
   POSTPAID = 'Оплата при доставці (передоплата 100грн.)',
}

export const CheckoutPage: React.FC = () => {
   const dispatch = useAppDispatch();

   const { isAuth } = useAppSelector((state) => state.userReducer);
   const { isLoadingBasket, basket, totalCountOfShoesInBasket } =
      useAppSelector((state) => state.basketReducer);
   const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
   const [totalPrice, setTotalPrice] = useState<number>(0);
   const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);

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

   const clearBasket = () => {
      if (isAuth) {
         return dispatch(deleteAllFromBasket());
      } else {
         return dispatch(deleteAllFromBasketNotAuth());
      }
   };

   const handleSubmitCheckout = (customerInfo: ICustomerInfo) => {
      const basketOrder: IBasketCheckoutItem[] = basket.map((item) => {
         return {
            modelId: item.sho.id,
            count: item.count,
            size: item.size.size,
         };
      });
      const orderInfo: IOrderInfo = {
         price: totalPrice,
         basket: basketOrder,
      };
      setIsLoadingOrder(true);
      CheckoutReq.createCheckout(customerInfo, orderInfo)
         .then(() => {
            setIsCheckoutSuccess(true);
         })
         .then(() => clearBasket())
         .finally(() => setIsLoadingOrder(false));
   };
   if ((isLoadingBasket && isAuth) || isLoadingOrder) {
      return <Loader className='checkout__loader' />;
   }

   return (
      <div className='checkout'>
         <div className='checkout__main'>
            <h3 className='checkout__page-header main-page-title'>
               Оформлення замовлення
            </h3>
            {isCheckoutSuccess ? (
               <CheckoutSuccess />
            ) : (
               <>
                  <div className='checkout__names-columns-container'>
                     <div className='checkout__names-columns-photo'> Фото</div>
                     <div>Інформація</div>
                     <div>Кількість</div>
                     <div>Ціна</div>
                     <div>Разом</div>
                  </div>
                  {basket.length > 0 ? (
                     <div>
                        {basket.map(({ id, sho, count, size }) => (
                           <CheckoutItem
                              key={id}
                              id={id}
                              shoes={sho}
                              count={+count}
                              size={size}
                           />
                        ))}

                        <div className='checkout__info'>
                           <p className='checkout__info__header'>
                              Разом до оплати:
                           </p>
                           <p className='checkout__info__text'>
                              {totalPrice} грн.
                           </p>
                        </div>
                        <CustomerDeliveryInfo
                           handleSubmitCheckout={handleSubmitCheckout}
                        />
                     </div>
                  ) : (
                     <p className='checkout__empty-text'>
                        Ваша Корзина Порожня
                     </p>
                  )}
               </>
            )}
         </div>
      </div>
   );
};
