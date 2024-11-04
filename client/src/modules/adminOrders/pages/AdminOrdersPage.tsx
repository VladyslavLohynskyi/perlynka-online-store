import React, { useEffect, useState } from 'react';
import OrderReq, { IOrderWithItems } from '../../../http/orders';

import './AdminOrdersPage.scss';
import { OrderItem } from '../components/OrderItem';
import { Pagination } from '../../shop/components/Pagination';

export const AdminOrdersPage: React.FC = () => {
   const [orders, setOrders] = useState<IOrderWithItems[]>([]);
   const [isLoadingOrders, setIsLoadingOrders] = useState(true);
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
   return (
      <div className='admin-orders'>
         <div className='admin-orders__container'>
            <h3>Замовлення Клієнтів</h3>
            <main className='admin-orders__main'>
               <div className='admin-orders__filters'></div>
               <div className='admin-orders__orders-container'>
                  {orders.map((order) => (
                     <OrderItem key={order.id} order={order} />
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
   );
};
