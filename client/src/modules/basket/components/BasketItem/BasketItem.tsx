import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './BasketItem.scss';
import { BasketItemType } from './BasketItemType';
import { baseURL } from '../../../../utils/constants';
import { HorizontalLine } from '../../../ui/HorizontalLine';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { IconButton } from '../../../ui/IconButton';

import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { deleteOneShoesFromBasket } from '../../../../store/reducers/basket/BasketActionCreators';

export const BasketItem: React.FC<BasketItemType> = ({
   shoes,
   count,
   size,
}) => {
   const dispatch = useAppDispatch();
   const { brands, types, seasons } = useAppSelector(
      (state) => state.shoesReducer,
   );

   const handleClickTrashButton = () => {
      dispatch(deleteOneShoesFromBasket(shoes.id, +size.id));
   };
   return (
      <>
         <div className='basket-item__container'>
            <div>
               <img src={baseURL + shoes.img} alt='shoes' />
            </div>
            <div>
               <p>
                  {types?.find((type) => +type.id === shoes.typeId)?.name}{' '}
                  {brands?.find((brand) => +brand.id === shoes.brandId)?.name}{' '}
                  {shoes.model}{' '}
                  {
                     seasons?.find((season) => +season.id === shoes.seasonId)
                        ?.name
                  }
               </p>
               <p className='basket-item__size-text'>Розмір: {size.size} EU</p>
            </div>
            <div>{shoes.price} грн.</div>
            <div className='basket-item__buy-counter'>
               <IconButton icon={faChevronUp} />
               <div className='basket-item__buy-number'>
                  <p>{count}</p>
               </div>
               <IconButton icon={faChevronDown} />
            </div>
            <div>{shoes.price * count} грн.</div>
            <div className='basket-item__trash-button-container'>
               <IconButton icon={faTrash} onClick={handleClickTrashButton} />
            </div>
         </div>
         <HorizontalLine />
      </>
   );
};
