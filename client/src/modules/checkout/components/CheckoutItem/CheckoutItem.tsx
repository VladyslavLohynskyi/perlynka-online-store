import React from 'react';
import './CheckoutItem.scss';
import { CheckoutItemType } from './CheckoutItemType';
import { RoutesEnum, baseURL } from '../../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IconButton } from '../../../ui/IconButton';

import { faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
   decrementCountOfOneShoesInBasket,
   decrementCountOfOneShoesInBasketNotAuth,
   deleteOneShoesFromBasket,
   deleteOneShoesFromBasketNotAuth,
   incrementCountOfOneShoesInBasket,
   incrementCountOfOneShoesInBasketNotAuth,
} from '../../../../store/reducers/basket/BasketActionCreators';
import { useNavigate } from 'react-router-dom';

export const CheckoutItem: React.FC<CheckoutItemType> = ({
   id,
   shoes,
   count,
   size,
}) => {
   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const { brands, types, seasons } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const navigate = useNavigate();
   const handleClickTrashButton = () => {
      if (isAuth) {
         dispatch(deleteOneShoesFromBasket(shoes.id, +size.id));
      } else {
         dispatch(deleteOneShoesFromBasketNotAuth(id));
      }
   };

   const handleClickIncrementButton = () => {
      if (isAuth) {
         dispatch(incrementCountOfOneShoesInBasket(id));
      } else {
         dispatch(incrementCountOfOneShoesInBasketNotAuth(id));
      }
   };

   const handleClickDecrementButton = () => {
      if (count > 1) {
         if (isAuth) {
            dispatch(decrementCountOfOneShoesInBasket(id));
         } else {
            dispatch(decrementCountOfOneShoesInBasketNotAuth(id));
         }
      }
   };
   return (
      <div className='checkout-item__container'>
         <div
            className='checkout-item__img-container'
            onClick={() => navigate(RoutesEnum.SHOES + '/' + shoes.id)}
         >
            <img src={baseURL + shoes.img} alt='shoes' />
         </div>
         <div>
            <p
               className='checkout-item__main-info'
               onClick={() => navigate(RoutesEnum.SHOES + '/' + shoes.id)}
            >
               {types?.find((type) => +type.id === shoes.typeId)?.name}{' '}
               {brands?.find((brand) => +brand.id === shoes.brandId)?.name}{' '}
               {shoes.model}{' '}
               {seasons?.find((season) => +season.id === shoes.seasonId)?.name}
            </p>
            <p className='checkout-item__size-text'>Розмір: {size.size} EU</p>
         </div>
         <div className='checkout-item__buy-counter'>
            <IconButton
               icon={faMinus}
               onClick={handleClickDecrementButton}
               style={{ padding: '5px' }}
            />
            <div className='checkout-item__buy-number'>
               <p>{count}</p>
            </div>
            <IconButton
               icon={faPlus}
               onClick={handleClickIncrementButton}
               style={{ padding: '5px' }}
            />
            <IconButton
               icon={faXmark}
               onClick={handleClickTrashButton}
               style={{ color: 'red', padding: '5px' }}
            />
         </div>
         <div>{shoes.price} грн.</div>
         <div>{shoes.price * count} грн.</div>
      </div>
   );
};
