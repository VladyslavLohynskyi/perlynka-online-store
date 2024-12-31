import React, { useEffect, useState } from 'react';
import OrderReq, { IOrderWithItems } from '../../../http/orders';

import './AdminOrdersPage.scss';
import { OrderItem } from '../components/OrderItem';
import { Pagination } from '../../shop/components/Pagination';
import {
   OrderFilterOptions,
   OrderFiltersEnum,
   OrderStatusEnum,
   OrderStatusOptions,
} from '../../../utils/constants';
import Alert from '../../ui/Alert/Alert';
import { AlertTypeEnum } from '../../ui/Alert/AlertType';
import { ModalInput } from '../../modal/components/HeaderDropdown/components/ModalInput';
import { useDebounce } from '../../../hooks/useDebounce';
import PhoneInput from 'react-phone-input-2';
import { HorizontalLine } from '../../ui/HorizontalLine';

export const AdminOrdersPage: React.FC = () => {
   const [orders, setOrders] = useState<IOrderWithItems[]>([]);
   const [isLoadingOrders, setIsLoadingOrders] = useState(true);
   const [statusOption, setStatusOption] = useState<
      OrderStatusEnum | 'Всі Статуси'
   >('Всі Статуси');

   const [filterOption, setFilterOption] = useState<OrderFiltersEnum>(
      OrderFiltersEnum.DATE_DESC,
   );
   const [message, setMessage] = useState('');
   const [email, setEmail] = useState('');
   const debouncedEmail = useDebounce(email, 1000);
   const [phone, setPhone] = useState('');
   const debouncedPhone = useDebounce(phone, 1000);
   const [name, setName] = useState('');
   const debouncedName = useDebounce(name, 1000);
   const [surname, setSurname] = useState('');
   const debouncedSurname = useDebounce(surname, 1000);
   const [isAlertShewed, setIsAlertShowed] = useState(false);
   const [count, setCount] = useState(0);
   const [page, setPage] = useState(1);
   const limit = 16;
   useEffect(() => {
      OrderReq.getOrdersByAdmin({
         offset: limit * (page - 1),
         limit,
         status: statusOption,
         email: debouncedEmail,
         phone: debouncedPhone,
         name: debouncedName,
         surname: debouncedSurname,
         filterOption,
      })
         .then((data) => {
            setCount(data.count);
            setOrders([...data.rows]);
         })
         .finally(() => {
            setIsLoadingOrders(false);
         });
   }, [
      page,
      statusOption,
      filterOption,
      debouncedEmail,
      debouncedPhone,
      debouncedName,
      debouncedSurname,
   ]);

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
               email: debouncedEmail,
               phone: debouncedPhone,
               name: debouncedName,
               surname: debouncedSurname,
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
      setIsLoadingOrders(true);
      setStatusOption(e.target.value as OrderStatusEnum | 'Всі Статуси');
      setPage(1);
   };

   const handleClickSelectFilterOption = (
      e: React.ChangeEvent<HTMLSelectElement>,
   ) => {
      setIsLoadingOrders(true);
      setFilterOption(e.target.value as OrderFiltersEnum);
      setPage(1);
   };

   return (
      <>
         <div className='admin-orders'>
            <div className='admin-orders__container'>
               <h3>Замовлення Клієнтів</h3>
               <main className='admin-orders__main'>
                  <div>
                     <HorizontalLine />
                     <h4 style={{ marginLeft: '10px' }}>Фільтрація:</h4>
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
                        <ModalInput
                           text='Пошук за поштою'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <PhoneInput
                           country={'ua'}
                           onlyCountries={['ua']}
                           inputClass='basic-input'
                           inputStyle={{
                              width: 'calc(100% - 20px)',
                              maxWidth: '500px',
                              margin: '0 20px 0 0',
                              fontSize: '12px',
                              border: '1.5px solid #d9d7d7',
                              backgroundColor: '#fff',
                              height: '38px',
                           }}
                           buttonStyle={{
                              border: '1.5px solid #d9d7d7',
                           }}
                           disableDropdown={true}
                           countryCodeEditable={false}
                           inputProps={{
                              name: 'phone',
                           }}
                           value={phone}
                           onChange={(e) => setPhone(e)}
                        />
                        <ModalInput
                           text='Пошук за іменем'
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                        <ModalInput
                           text='Пошук за прізвищем'
                           value={surname}
                           onChange={(e) => setSurname(e.target.value)}
                        />
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
