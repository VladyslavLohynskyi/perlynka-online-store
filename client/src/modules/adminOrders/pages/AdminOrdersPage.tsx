import React, { useEffect, useState } from 'react';
import OrderReq, { IOrderWithItems } from '../../../http/orders';

import './AdminOrdersPage.scss';
import { OrderItem } from '../components/OrderItem';

export const AdminOrdersPage: React.FC = () => {
   const [orders, setOrders] = useState<IOrderWithItems[]>([]);
   const [isLoadingOrders, setIsLoadingOrders] = useState(true);
   const [count, setCount] = useState(0);
   useEffect(() => {
      OrderReq.getOrdersByAdmin()
         .then((data) => {
            setCount(data.count);
            setOrders([...data.rows]);
         })
         .finally(() => {
            setIsLoadingOrders(false);
         });
   }, []);
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
            </main>
         </div>
      </div>
   );
};
