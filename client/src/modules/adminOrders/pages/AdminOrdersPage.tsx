import React, { useEffect, useState } from 'react';
import OrderReq, { IOrderWithItems } from '../../../http/orders';

import './AdminOrdersPage.scss';
import { OrderItem } from '../components/OrderItem';
import { Pagination } from '../../shop/components/Pagination';
import { OrderStatusEnum, OrderStatusOptions } from '../../../utils/constants';
import Alert from '../../ui/Alert/Alert';
import { AlertTypeEnum } from '../../ui/Alert/AlertType';
import { ModalInput } from '../../modal/components/HeaderDropdown/components/ModalInput';
import { useDebounce } from '../../../hooks/useDebounce';

export const AdminOrdersPage: React.FC = () => {
   const [orders, setOrders] = useState<IOrderWithItems[]>([]);
   const [isLoadingOrders, setIsLoadingOrders] = useState(true);
   const [statusOption, setStatusOption] = useState<
      OrderStatusEnum | 'Всі Статуси'
   >('Всі Статуси');
   const [message, setMessage] = useState('');
   const [email, setEmail] = useState('');
   const debouncedEmail = useDebounce(email, 1000);
   const [isAlertShewed, setIsAlertShowed] = useState(false);
   const [count, setCount] = useState(0);
   const [page, setPage] = useState(1);
   const limit = 16;
   useEffect(() => {
      OrderReq.getOrdersByAdmin({
         offset: limit * (page - 1),
         limit,
         status: statusOption,
      })
         .then((data) => {
            setCount(data.count);
            setOrders([...data.rows]);
         })
         .finally(() => {
            setIsLoadingOrders(false);
         });
   }, [page, statusOption, debouncedEmail]);

   const changeStatus = (id: number, status: OrderStatusEnum) => {
      OrderReq.updateOrderStatus(id, status)
         .then(({ message }) => {
            setMessage(message);
            setIsAlertShowed(true);
         })
         .finally(() => {
            setPage(1);
            setIsLoadingOrders(true);
            OrderReq.getOrdersByAdmin({
               offset: limit * (1 - 1),
               limit,
               status: statusOption,
            })
               .then((data) => {
                  setCount(data.count);
                  setOrders([...data.rows]);
               })
               .finally(() => {
                  setIsLoadingOrders(false);
               });
         });
   };

   const handleClickSelectStatusOption = (
      e: React.ChangeEvent<HTMLSelectElement>,
   ) => {
      setIsLoadingOrders(true);
      setStatusOption(e.target.value as OrderStatusEnum | 'Всі Статуси');
   };

   return (
      <>
         <div className='admin-orders'>
            <div className='admin-orders__container'>
               <h3>Замовлення Клієнтів</h3>
               <main className='admin-orders__main'>
                  <div className='admin-orders__filters'>
                     <select
                        name='change-status'
                        className='admin-orders__select-status'
                        value={statusOption}
                        onChange={handleClickSelectStatusOption}
                     >
                        <option value={'Всі Статуси'}>Всі Статуси</option>
                        {OrderStatusOptions.map((option) => (
                           <option key={option.id} value={option.name}>
                              {option.name}
                           </option>
                        ))}
                     </select>
                     <ModalInput
                        text='Пошук за поштою'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </div>
                  <div className='admin-orders__orders-container'>
                     {orders.map((order) => (
                        <OrderItem
                           changeStatus={changeStatus}
                           key={order.id}
                           order={order}
                        />
                     ))}
                  </div>
                  <Pagination
                     page={page}
                     limit={limit}
                     countOfShoesModels={count}
                     handleChangePage={(number: number) => setPage(number)}
                  />
               </main>
            </div>
         </div>
         <Alert
            show={isAlertShewed}
            onClose={() => setIsAlertShowed(false)}
            message={message}
            type={AlertTypeEnum.SUCCESS}
         />
      </>
   );
};
