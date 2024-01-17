import BasketReq from '../../../http/basket';
import { AppDispatch } from '../../store';
import { basketSlice } from './BasketSlice';

export const addShoesToBasket =
   (shoId: number, sizeId: number, count: number) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(basketSlice.actions.start());
         await BasketReq.addShoesToBasket(shoId, sizeId, count);
         const basket = await BasketReq.getAllInBasket();
         dispatch(basketSlice.actions.addShoesToBasketSuccess(basket));
      } catch (error) {
         dispatch(basketSlice.actions.error('Adding Shoes to basket Error'));
      }
   };
