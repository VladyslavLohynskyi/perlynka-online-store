import React, { useEffect, useState } from 'react';

import './OrderItem.scss';
import { OrderItemType } from './OrderItemType';
import { DeliveryOptionsEnum } from '../../../checkout/pages';
import { IconButton } from '../../../ui/IconButton';
import {
   faAngleDoubleDown,
   faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { OrderShoesItem } from '../OrderShoesItem';

export const OrderItem: React.FC<OrderItemType> = ({ order }) => {
   const [isMoreButtonClicked, setIsMoreButtonClicked] = useState(false);
   const handleClickMoreButton = () => {
      setIsMoreButtonClicked((prev) => !prev);
   };
   console.log(order);
   return (
      <div className='order-item'>
         <div className='order-item__top'>
            <p className='order-item__id'>Номер замовлення: #{order.id}</p>
            <p className='order-item__status'>Cтатус: {order.status}</p>
         </div>
         <div className='order-item__data-container'>
            <div className='order-item__customer-data'>
               <h4>Клієнт:</h4>
               <p>
                  <span>Пошта:</span> {order.email}
               </p>
               <p>
                  <span>Ім'я:</span> {order.name}
               </p>
               <p>
                  <span>Прізвище:</span> {order.surname}
               </p>
               <p>
                  <span>Номер Телефону:</span> +{order.phone}
               </p>
            </div>
            <div className='order-item__delivery-data'>
               <h4>Доставка:</h4>
               <p>
                  <span>Спосіб Оплати:</span> {order.paymentOption}.
               </p>
               <p>
                  <span>Спосіб Доставки:</span> {order.deliveryOption}.
               </p>
               {order.deliveryOption === DeliveryOptionsEnum.NOVA_POST && (
                  <p>
                     {order.settlementAreaDescription} обл.,{' '}
                     {order.settlementTypeDescription}{' '}
                     {order.settlementDescription}, {order.deliveryDescription}.
                  </p>
               )}
            </div>
         </div>
         {isMoreButtonClicked && (
            <>
               <div className='order-item__names-columns-container'>
                  <div className='order-item__names-columns-photo'> Фото</div>
                  <div>Інформація</div>
                  <div>Кількість</div>
                  <div>Ціна</div>
                  <div>Разом</div>
               </div>
               <div className='order-item__order-list'>
                  {order.order_items.map((item) => (
                     <OrderShoesItem key={item.id} orderShoesItem={item} />
                  ))}
               </div>
               <div className='order-item__info'>
                  <p className='order-item__info__header'>Разом до оплати:</p>
                  <p className='order-item__info__text'>
                     {order.totalPrice} грн.
                  </p>
               </div>
            </>
         )}
         <div className='order-item__more-button'>
            <Button
               onClick={handleClickMoreButton}
               buttonClass={ButtonClassEnum.LINK}
               style={{ width: '100%', fontSize: '16px' }}
            >
               <FontAwesomeIcon
                  icon={
                     isMoreButtonClicked ? faAngleDoubleUp : faAngleDoubleDown
                  }
               ></FontAwesomeIcon>{' '}
            </Button>
         </div>
      </div>
   );
};
