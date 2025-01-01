import React, { useEffect, useState } from 'react';
import OrderReq, { IOrderWithItems } from '../../../http/orders';

import './UserOrdersPage.scss';

import { Pagination } from '../../shop/components/Pagination';
import {
   OrderFilterOptions,
   OrderFiltersEnum,
   OrderStatusEnum,
   OrderStatusOptions,
} from '../../../utils/constants';
import Alert from '../../ui/Alert/Alert';
import { AlertTypeEnum } from '../../ui/Alert/AlertType';
import { HorizontalLine } from '../../ui/HorizontalLine';
import { Loader } from '../../ui/Loader';
import { OrderItem } from '../../adminOrders/components/OrderItem';

export const UserOrdersPage: React.FC = () => {
   const [orders, setOrders] = useState<IOrderWithItems[]>([]);
   const [isLoadingOrders, setIsLoadingOrders] = useState(true);
   const [statusOption, setStatusOption] = useState<
      OrderStatusEnum | 'Всі Статуси'
   >('Всі Статуси');

   const [filterOption, setFilterOption] = useState<OrderFiltersEnum>(
      OrderFiltersEnum.DATE_DESC,
   );
   const [message, setMessage] = useState('');
   const [isAlertShewed, setIsAlertShowed] = useState(false);
   const [count, setCount] = useState(0);
   const [page, setPage] = useState(1);
   const limit = 16;
   useEffect(() => {
      setIsLoadingOrders(true);
      OrderReq.getOrdersByUser({
         offset: limit * (page - 1),
         limit,
         status: statusOption,
         filterOption,
      })
         .then((data) => {
            setCount(data.count);
            setOrders([...data.rows]);
         })
         .finally(() => {
            setIsLoadingOrders(false);
         });
   }, [page, statusOption, filterOption]);

   const changeStatus = (id: number, status: OrderStatusEnum) => {
      OrderReq.updateOrderStatus(id, status)
         .then(({ message }) => {
            setMessage(message);
            setIsAlertShowed(true);
         })
         .finally(() => {
            setPage(1);
            setIsLoadingOrders(true);
            OrderReq.getOrdersByUser({
               offset: limit * (1 - 1),
               limit,
               status: statusOption,
               filterOption,
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
      setStatusOption(e.target.value as OrderStatusEnum | 'Всі Статуси');
      setPage(1);
   };

   const handleClickSelectFilterOption = (
      e: React.ChangeEvent<HTMLSelectElement>,
   ) => {
      setFilterOption(e.target.value as OrderFiltersEnum);
      setPage(1);
   };

   return (
      <>
         <div className='admin-orders'>
            <div className='admin-orders__container'>
               <h3>Mої замовлення:</h3>
               <main className='admin-orders__main'>
                  <div>
                     <HorizontalLine />
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
                        <select
                           name='change-filter'
                           className='admin-orders__select-status'
                           value={filterOption}
                           onChange={handleClickSelectFilterOption}
                        >
                           {OrderFilterOptions.map((option) => (
                              <option key={option.id} value={option.name}>
                                 {option.name}
                              </option>
                           ))}
                        </select>
                     </div>
                     <HorizontalLine style={{ marginBottom: '25px' }} />
                  </div>
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '20px',
                     }}
                  >
                     <h5>Кількість знайдених записів: {count}</h5>
                  </div>
                  <div className='admin-orders__orders-container'>
                     {isLoadingOrders ? (
                        <Loader />
                     ) : (
                        orders.map((order) => (
                           <OrderItem
                              changeStatus={changeStatus}
                              key={order.id}
                              order={order}
                              isAdmin={false}
                           />
                        ))
                     )}
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
