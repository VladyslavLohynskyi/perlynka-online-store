import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './BasketItem.scss';
import { BasketItemType } from './BasketItemType';
import { RoutesEnum, baseURL } from '../../../../utils/constants';
import { HorizontalLine } from '../../../ui/HorizontalLine';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IconButton } from '../../../ui/IconButton';

import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
   decrementCountOfOneShoesInBasket,
   decrementCountOfOneShoesInBasketNotAuth,
   deleteOneShoesFromBasket,
   deleteOneShoesFromBasketNotAuth,
   incrementCountOfOneShoesInBasket,
   incrementCountOfOneShoesInBasketNotAuth,
} from '../../../../store/reducers/basket/BasketActionCreators';
import { useNavigate } from 'react-router-dom';

export const BasketItem: React.FC<BasketItemType> = ({
   id,
   shoes,
   count,
   size,
}) => {
   const dispatch = useAppDispatch();
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const { brands, types } = useAppSelector((state) => state.shoesReducer);
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
      <>
         <div className='basket-item__container'>
            <div
               className='basket-item__img-container'
               onClick={() => navigate(RoutesEnum.SHOES + '/' + shoes.id)}
            >
               <img src={baseURL + shoes.img + '-preview.webp'} alt='shoes' />
            </div>
            <div className='basket-item__info-container'>
               <p
                  className='basket-item__main-info sort-title-text'
                  onClick={() => navigate(RoutesEnum.SHOES + '/' + shoes.id)}
               >
                  {types?.find((type) => +type.id === shoes.typeId)?.name}{' '}
                  {brands?.find((brand) => +brand.id === shoes.brandId)?.name}{' '}
                  {shoes.model}{' '}
               </p>
               <p className='basket-item__size-text label-text'>
                  Розмір взуття: {size.size} EU
               </p>
            </div>
            <p className='label-text'>{shoes.price} грн.</p>
            <div className='basket-item__buy-counter'>
               <IconButton
                  icon={faChevronUp}
                  onClick={handleClickIncrementButton}
               />
               <div className='basket-item__buy-number'>
                  <p>{count}</p>
               </div>
               <IconButton
                  icon={faChevronDown}
                  onClick={handleClickDecrementButton}
               />
            </div>
            <p className='label-text'>{shoes.price * count} грн.</p>
            <div className='basket-item__trash-button-container'>
               <IconButton icon={faTrash} onClick={handleClickTrashButton} />
            </div>
         </div>
         <HorizontalLine />
      </>
   );
};
