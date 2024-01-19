import BasketReq from '../../../http/basket';
import { AppDispatch } from '../../store';
import { basketSlice } from './BasketSlice';

export const addShoesToBasket =
   (shoId: number, sizeId: number, count: number) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(basketSlice.actions.start());
         await BasketReq.addShoesToBasket(shoId, sizeId, count);
         const basketItems = await BasketReq.getAllInBasket();
         dispatch(
            basketSlice.actions.addShoesToBasketSuccess({ basketItems, count }),
         );
      } catch (error) {
         dispatch(basketSlice.actions.error('Adding Shoes to basket Error'));
      }
   };

export const getTotalCountOfShoesInBasket =
   () => async (dispatch: AppDispatch) => {
      try {
         dispatch(basketSlice.actions.start());
         const totalCount = await BasketReq.getTotalCountOfShoesInBasket();
         dispatch(
            basketSlice.actions.getTotalCountOfShoesInBasketSuccess(totalCount),
         );
      } catch (error) {
         dispatch(
            basketSlice.actions.error(
               'Getting count of all Shoes from basket Error',
            ),
         );
      }
   };

export const getAllShoesOfBasket = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(basketSlice.actions.start());
      const basket = await BasketReq.getAllInBasket();
      dispatch(basketSlice.actions.getAllShoesOfBasketSuccess(basket));
   } catch (error) {
      dispatch(basketSlice.actions.error('Getting all Shoes of basket Error'));
   }
};

export const deleteOneShoesFromBasket =
   (id: number, sizeId: number) => async (dispatch: AppDispatch) => {
      try {
         dispatch(basketSlice.actions.start());
         await BasketReq.deleteOneShoesFromBasket(id, sizeId);
         dispatch(
            basketSlice.actions.deleteOneShoesFromBasketSuccess({ id, sizeId }),
         );
      } catch (error) {
         dispatch(
            basketSlice.actions.error('Deleting one Shoes of basket Error'),
         );
      }
   };
