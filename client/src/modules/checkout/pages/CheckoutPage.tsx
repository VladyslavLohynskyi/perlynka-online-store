import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import './CheckoutPage.scss';
import {
   getAllShoesOfBasket,
   getAllShoesOfBasketNotAuth,
} from '../../../store/reducers/basket/BasketActionCreators';
import { CheckoutItem } from '../components/CheckoutItem';
import { BasicInput } from '../../ui/BasicInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import novaPost, { IArea } from '../../../http/novaPost';
import Select from 'react-select';
import ReactSelectAsync from 'react-select/async';
export const CheckoutPage: React.FC = () => {
   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const { basket, totalCountOfShoesInBasket } = useAppSelector(
      (state) => state.basketReducer,
   );

   const [areaRef, setAreaRef] = useState<string>('');
   const [areaName, setAreaName] = useState<string>('');
   const [areas, setAreas] = useState<IArea[]>();
   const [email, setEmail] = useState<string>();
   const [phone, setPhone] = useState<string>();
   const [name, setName] = useState<string>();
   const [surname, setSurname] = useState<string>();
   const [totalPrice, setTotalPrice] = useState<number>(0);
   const [settlementRef, setSettlementRef] = useState<string>('');
   const [settlementName, setSettlementName] = useState<string>('');
   const [warehouseRef, setWarehouseRef] = useState<string>('');
   useEffect(() => {
      let price = 0;
      basket.forEach((el) => {
         price += el.count * el.sho.price;
      });
      setTotalPrice(price);
   }, [totalCountOfShoesInBasket, basket]);
   useEffect(() => {
      novaPost.getAreas().then((data) => setAreas(data));
   }, []);
   useEffect(() => {
      if (isAuth) {
         dispatch(getAllShoesOfBasket());
      } else {
         dispatch(getAllShoesOfBasketNotAuth());
      }
   }, []);

   const promiseCityOptions = async (inputValue: string) => {
      return novaPost.getSettlements(areaRef, inputValue).then((data) => {
         return data.map((el) => {
            return {
               value: el.Ref,
               label: el.Description + ' ' + el.RegionsDescription,
            };
         });
      });
   };

   const promiseWarehouseOptions = async (inputValue: string) => {
      return novaPost.getWarehouses(settlementRef, inputValue).then((data) => {
         return data.map((el) => {
            return {
               value: el.Description,
               label: el.Description,
            };
         });
      });
   };

   return (
      <div className='checkout'>
         <div className='checkout__main'>
            <h3 className='checkout__page-header'>Оформлення замовлення</h3>
            <div className='checkout__names-columns-container'>
               <div> Фото</div>
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
                        Доставка у відділення Нової Пошти:
                     </p>
                     <p className='checkout__info__text'>80 грн.</p>
                  </div>
                  <div className='checkout__info'>
                     <p className='checkout__info__header'>Разом:</p>
                     <p className='checkout__info__text'>{totalPrice} грн.</p>
                  </div>
                  <div className='checkout__info'>
                     <p className='checkout__info__header'>Всього:</p>
                     <p className='checkout__info__text'>
                        {totalPrice + 80} грн.
                     </p>
                  </div>
                  <form className='checkout__order-info'>
                     <div className='checkout__customer-info__container'>
                        <div className='checkout__customer-info__header'>
                           <p>Покупець</p>
                        </div>
                        <div className='checkout__customer-info__input-container'>
                           <label>
                              <span>Email</span>
                              <BasicInput
                                 type='email'
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 required={true}
                              />
                           </label>
                        </div>

                        <div className='checkout__customer-info__input-container'>
                           <label>
                              <span>Ім'я</span>
                              <BasicInput
                                 type='text'
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 required={true}
                              />
                           </label>
                        </div>

                        <div className='checkout__customer-info__input-container'>
                           <label>
                              <span>Прізвище</span>
                              <BasicInput
                                 type='text'
                                 value={surname}
                                 onChange={(e) => setSurname(e.target.value)}
                                 required={true}
                              />
                           </label>
                        </div>
                        <div className='checkout__customer-info__input-container'>
                           <label>
                              <span>Телефон</span>
                              <PhoneInput
                                 country={'ua'}
                                 onlyCountries={['ua']}
                                 inputClass='basic-input'
                                 inputStyle={{ width: '100%' }}
                                 disableDropdown={true}
                                 countryCodeEditable={false}
                                 inputProps={{
                                    name: 'phone',
                                    required: true,
                                 }}
                                 value={phone}
                                 onChange={(e) => {
                                    setPhone(e);
                                 }}
                              />
                           </label>
                        </div>
                     </div>
                     <div className='checkout__customer-info__container'>
                        <div className='checkout__customer-info__header'>
                           <p>Адреса доставки</p>
                        </div>
                        <div className='checkout__customer-info__input-container'>
                           <label>
                              <span>Область</span>
                              <Select
                                 name='area'
                                 onChange={(e) => {
                                    setAreaRef(e!.value);
                                 }}
                                 placeholder=''
                                 options={areas?.map((el) => {
                                    return {
                                       value: el.Ref,
                                       label:
                                          el.Description + ' ' + el.RegionType,
                                    };
                                 })}
                              />
                           </label>
                        </div>
                        <div className='checkout__customer-info__input-container'>
                           <label>
                              <span>Місто</span>
                              {areaRef.length <= 0 ? (
                                 <Select
                                    isDisabled={areaRef.length <= 0}
                                    placeholder=''
                                 />
                              ) : (
                                 <ReactSelectAsync
                                    cacheOptions
                                    defaultOptions
                                    onChange={(e) => setSettlementRef(e!.value)}
                                    placeholder='Введіть назву населеного пункту'
                                    loadOptions={promiseCityOptions}
                                 />
                              )}
                           </label>
                        </div>
                        <div className='checkout__customer-info__input-container'>
                           <label>
                              <span>Відділення</span>
                              {settlementRef.length <= 0 ? (
                                 <Select
                                    isDisabled={settlementRef.length <= 0}
                                    placeholder=''
                                 />
                              ) : (
                                 <ReactSelectAsync
                                    cacheOptions
                                    defaultOptions
                                    onChange={(e) => setWarehouseRef(e!.value)}
                                    placeholder='Введіть номер відділення'
                                    loadOptions={promiseWarehouseOptions}
                                 />
                              )}
                           </label>
                        </div>
                     </div>
                  </form>
               </div>
            ) : (
               <p className='checkout__empty-text'>Ваша Корзина Порожня</p>
            )}
         </div>
      </div>
   );
};