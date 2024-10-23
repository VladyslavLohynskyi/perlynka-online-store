import React, { useEffect, useState } from 'react';
import './CustomerDeliveryInfo.scss';
import { BasicInput } from '../../../ui/BasicInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import ReactSelectAsync from 'react-select/async';
import { DeliveryOptionsEnum, PaymentOptionsEnum } from '../../pages';
import novaPost, { IArea, IWarehouse } from '../../../../http/novaPost';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { ICustomerInfo } from '../../../../http/checkout';
import { CustomerDeliveryInfoType } from './CustomerDeliveryInfoType';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getFullInfoOfUser } from '../../../../store/reducers/user/UserActionCreators';
import { Loader } from '../../../ui/Loader';
import { phoneNumberPattern } from '../../../../utils/constants';

export const CustomerDeliveryInfo: React.FC<CustomerDeliveryInfoType> = ({
   handleSubmitCheckout,
}) => {
   const dispatch = useAppDispatch();
   const { user, isAuth, isLoadingFullUserInfo } = useAppSelector(
      (state) => state.userReducer,
   );
   const [email, setEmail] = useState<string>('');
   const [name, setName] = useState<string>('');
   const [surname, setSurname] = useState<string>('');
   const [phone, setPhone] = useState<string>('');
   const [paymentActiveOption, setPaymentActiveOption] =
      useState<PaymentOptionsEnum>(PaymentOptionsEnum.CARD_DETAILS);
   const [deliveryActiveOption, setDeliveryActiveOption] =
      useState<DeliveryOptionsEnum>(DeliveryOptionsEnum.NOVA_POST);
   const [areas, setAreas] = useState<IArea[]>();
   const [areaRef, setAreaRef] = useState<string>('');
   const [settlementRef, setSettlementRef] = useState<string>('');
   const [warehouse, setWarehouse] = useState<IWarehouse>();

   const [isValidatedPhoneNumber, setIsValidatedPhoneNumber] = useState(true);
   const [customError, setCustomError] = useState('');

   useEffect(() => {
      if (isAuth) {
         dispatch(getFullInfoOfUser()).then(() => {});
      }
   }, []);
   useEffect(() => {
      if (user?.email) setEmail(user?.email);
      if (user?.name) setName(user.name);
      if (user?.surname) setSurname(user.surname);
      if (user?.phoneNumber) setPhone(user.phoneNumber);
   }, [user]);

   useEffect(() => {
      novaPost.getAreas().then((data) => setAreas(data));
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
               data: el,
            };
         });
      });
   };

   const handleClickCheckoutBtn = () => {
      if (!name || !surname || !email || !phone) {
         return;
      }
      if (!phoneNumberPattern.test(phone)) {
         setIsValidatedPhoneNumber(false);
         setCustomError('Телефоний номер не валідний');
         return;
      }
      const customerInfo: ICustomerInfo = {
         name: name!,
         surname: surname!,
         email: email!,
         phone: phone!,
         PaymentOption: paymentActiveOption,
         DeliveryOption: deliveryActiveOption,
         SettlementAreaDescription: warehouse?.SettlementAreaDescription,
         SettlementDescription: warehouse?.SettlementDescription,
         SettlementTypeDescription: warehouse?.SettlementTypeDescription,
         Description: warehouse?.Description,
      };
      handleSubmitCheckout(customerInfo);
   };

   if (isLoadingFullUserInfo && isAuth) {
      return <Loader />;
   }

   return (
      <form
         name='checkout'
         className='checkout__order-info'
         onSubmit={(e) => e.preventDefault()}
      >
         <div className='checkout__customer-info__container'>
            <div className='checkout__customer-info__header'>
               <p>Покупець</p>
            </div>
            <div className='checkout__customer-info__input-container'>
               <label>
                  <span>Email</span>
                  <BasicInput
                     autoFocus={true}
                     name={'email'}
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
                     name={'name'}
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
                     name={'surname'}
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
                     inputStyle={{
                        width: '100%',
                        fontSize: '12px',
                        border: `1.5px solid ${
                           isValidatedPhoneNumber ? '#d9d7d7' : 'rgb(156, 5, 5)'
                        }`,
                     }}
                     buttonStyle={{
                        border: `1.5px solid ${
                           isValidatedPhoneNumber ? '#d9d7d7' : 'rgb(156, 5, 5)'
                        }`,
                     }}
                     disableDropdown={true}
                     countryCodeEditable={false}
                     inputProps={{
                        name: 'phone',
                        required: true,
                     }}
                     value={phone}
                     onChange={(e) => {
                        setCustomError('');
                        setIsValidatedPhoneNumber(true);
                        setPhone(e);
                     }}
                  />
               </label>
            </div>
            {customError && <h3 className='auth__error'>{customError}</h3>}
         </div>
         <div className='checkout__customer-info__container'>
            <div className='checkout__customer-info__header'>
               <p>Спосіб оплати</p>
            </div>
            <div className='checkout__customer-info__radio-container'>
               <div className='checkout__customer-info__radio'>
                  <label>
                     <input
                        type='radio'
                        id='card-details'
                        name='payment'
                        checked={
                           PaymentOptionsEnum.CARD_DETAILS ===
                           paymentActiveOption
                        }
                        onChange={() =>
                           setPaymentActiveOption(
                              PaymentOptionsEnum.CARD_DETAILS,
                           )
                        }
                     />
                     <span className='label-text'>
                        {PaymentOptionsEnum.CARD_DETAILS}
                     </span>
                  </label>
               </div>
               <div className='checkout__customer-info__radio'>
                  <label>
                     <input
                        type='radio'
                        id='postpaid'
                        name='payment'
                        checked={
                           PaymentOptionsEnum.POSTPAID === paymentActiveOption
                        }
                        onChange={() =>
                           setPaymentActiveOption(PaymentOptionsEnum.POSTPAID)
                        }
                     />
                     <span className='label-text'>
                        {PaymentOptionsEnum.POSTPAID}
                     </span>
                  </label>
               </div>
            </div>
            <div className='checkout__customer-info__header'>
               <p>Спосіб доставки</p>
            </div>
            <div className='checkout__customer-info__radio-container'>
               <div className='checkout__customer-info__radio'>
                  <label>
                     <input
                        type='radio'
                        id='post'
                        name='delivery'
                        checked={
                           DeliveryOptionsEnum.NOVA_POST ===
                           deliveryActiveOption
                        }
                        onChange={() =>
                           setDeliveryActiveOption(
                              DeliveryOptionsEnum.NOVA_POST,
                           )
                        }
                     />
                     <span className='label-text'>
                        {DeliveryOptionsEnum.NOVA_POST}
                     </span>
                  </label>
               </div>
               <div className='checkout__customer-info__radio'>
                  <label>
                     <input
                        type='radio'
                        id='self-delivery'
                        name='delivery'
                        checked={
                           DeliveryOptionsEnum.SELF_DELIVERY ===
                           deliveryActiveOption
                        }
                        onChange={() =>
                           setDeliveryActiveOption(
                              DeliveryOptionsEnum.SELF_DELIVERY,
                           )
                        }
                     />
                     <span className='label-text'>
                        {DeliveryOptionsEnum.SELF_DELIVERY}
                     </span>
                  </label>
               </div>
            </div>
            {deliveryActiveOption === DeliveryOptionsEnum.NOVA_POST && (
               <>
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
                           required={true}
                           options={areas?.map((el) => {
                              return {
                                 value: el.Ref,
                                 label: el.Description + ' ' + el.RegionType,
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
                              name={'settlement'}
                              isDisabled={areaRef.length <= 0}
                              placeholder=''
                           />
                        ) : (
                           <ReactSelectAsync
                              name={'settlement'}
                              required={true}
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
                              name={'warehouse'}
                              isDisabled={settlementRef.length <= 0}
                              placeholder=''
                           />
                        ) : (
                           <ReactSelectAsync
                              name={'warehouse'}
                              cacheOptions
                              defaultOptions
                              required={true}
                              onChange={(e) => {
                                 setWarehouse(e!.data);
                              }}
                              placeholder='Введіть номер відділення'
                              loadOptions={promiseWarehouseOptions}
                           />
                        )}
                     </label>
                  </div>
               </>
            )}
            <div className='checkout__submit-btn'>
               <Button
                  buttonClass={ButtonClassEnum.BUY}
                  buttonText='Оформити замовлення'
                  buttonClick={handleClickCheckoutBtn}
               />
            </div>
         </div>
      </form>
   );
};
