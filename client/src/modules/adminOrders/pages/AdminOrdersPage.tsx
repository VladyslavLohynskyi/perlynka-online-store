import React, { useEffect, useState } from 'react';
import OrderReq, { IOrderWithItems } from '../../../http/orders';

import './AdminOrdersPage.scss';
import { OrderItem } from '../components/OrderItem';
import { Pagination } from '../../shop/components/Pagination';
import { OrderStatusEnum } from '../../../utils/constants';
import Alert from '../../ui/Alert/Alert';
import { AlertTypeEnum } from '../../ui/Alert/AlertType';

export const AdminOrdersPage: React.FC = () => {
   const [orders, setOrders] = useState<IOrderWithItems[]>([]);
   const [isLoadingOrders, setIsLoadingOrders] = useState(true);
   const [message, setMessage] = useState('');
   const [isAlertShewed, setIsAlertShowed] = useState(false);
   const [count, setCount] = useState(0);
   const [page, setPage] = useState(1);
   const limit = 16;
   useEffect(() => {
      OrderReq.getOrdersByAdmin({ offset: limit * (page - 1), limit })
         .then((data) => {
            setCount(data.count);
            setOrders([...data.rows]);
         })
         .finally(() => {
            setIsLoadingOrders(false);
         });
   }, [page]);

   const changeStatus = (id: number, status: OrderStatusEnum) => {
      OrderReq.updateOrderStatus(id, status)
         .then(({ message }) => {
            setMessage(message);
            setIsAlertShowed(true);
         })
         .finally(() => {
            setPage(1);
            console.log('change');
            setIsLoadingOrders(true);
            OrderReq.getOrdersByAdmin({ offset: limit * (1 - 1), limit })
               .then((data) => {
                  setCount(data.count);
                  setOrders([...data.rows]);
               })
               .finally(() => {
                  setIsLoadingOrders(false);
               });
         });
   };
   return (
      <>
         <div className='admin-orders'>
            <div className='admin-orders__container'>
               <h3>Замовлення Клієнтів</h3>
               <main className='admin-orders__main'>
                  <div className='admin-orders__filters'></div>
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
