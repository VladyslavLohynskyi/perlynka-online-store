import React, { useEffect, useState } from 'react';

import './OrderItem.scss';
import { OrderItemType } from './OrderItemType';
import { DeliveryOptionsEnum } from '../../../checkout/pages';
import { IconButton } from '../../../ui/IconButton';
import {
   faAngleDoubleDown,
   faAngleDoubleUp,
   faPenToSquare,
   faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { OrderShoesItem } from '../OrderShoesItem';
import {
   OrderStatusEnum,
   OrderStatusOptions,
} from '../../../../utils/constants';
import moment from 'moment-timezone';

export const OrderItem: React.FC<OrderItemType> = ({
   order,
   changeStatus,
   isAdmin,
}) => {
   const [isMoreButtonClicked, setIsMoreButtonClicked] = useState(false);
   const handleClickMoreButton = () => {
      setIsMoreButtonClicked((prev) => !prev);
   };
   const [statusOption, setStatusOption] = useState<OrderStatusEnum>(
      order.status as OrderStatusEnum,
   );

   const [isSelectStatusDisabled, setIsSelectStatusDisabled] = useState(true);
   const handleClickSelectStatusOption = (
      e: React.ChangeEvent<HTMLSelectElement>,
   ) => {
      setStatusOption(e.target.value as OrderStatusEnum);
   };

   const handleClickChangeStatusButton = () => {
      if (!isSelectStatusDisabled && statusOption !== order.status) {
         changeStatus(order.id, statusOption);
      } else {
         setIsSelectStatusDisabled((prev) => !prev);
      }
   };
   return (
      <div className='order-item'>
         <div className='order-item__top'>
            <div className='order-item__id'>
               <p>Номер замовлення: #{order.id}</p>
               <p>
                  Дата:{' '}
                  {moment(order.createdAt)
                     .tz('Europe/Kyiv')
                     .format('YYYY-MM-DD HH:mm:ss')}
               </p>
            </div>
            <div className='order-item__status'>
               <p>Cтатус: </p>
               {isAdmin ? (
                  <select
                     disabled={isSelectStatusDisabled}
                     name='change-status'
                     className='order-item__select-status'
                     value={statusOption}
                     onChange={handleClickSelectStatusOption}
                  >
                     {OrderStatusOptions.map((option) => (
                        <option key={option.id} value={option.name}>
                           {option.name}
                        </option>
                     ))}
                  </select>
               ) : (
                  <p>{statusOption}</p>
               )}
               <IconButton
                  style={{
                     color:
                        !isSelectStatusDisabled && statusOption !== order.status
                           ? 'green'
                           : 'black',
                  }}
                  icon={!isSelectStatusDisabled ? faCheck : faPenToSquare}
                  onClick={handleClickChangeStatusButton}
               />
            </div>
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
