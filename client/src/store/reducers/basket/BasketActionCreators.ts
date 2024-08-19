import axios from 'axios';
import BasketReq, { IAddShoes } from '../../../http/basket';
import { AppDispatch } from '../../store';
import { IBasketItem, basketSlice } from './BasketSlice';

export const addShoesToBasket =
   (shoId: number, sizeId: number, count: number) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(basketSlice.actions.start());
         const { message } = await BasketReq.addShoesToBasket(
            shoId,
            sizeId,
            count,
         );
         const basketItems = await BasketReq.getAllInBasket();
         dispatch(
            basketSlice.actions.addShoesToBasketSuccess({
               basketItems,
               count,
               message,
            }),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(basketSlice.actions.error(error.response?.data));
         } else
            dispatch(
               basketSlice.actions.error(
                  'Помилка при додаванні товарів до корзини',
               ),
            );
      }
   };

export const addShoesToBasketNotAuth =
   (basketItem: IBasketItem) => (dispatch: AppDispatch) => {
      dispatch(basketSlice.actions.addShoesToBasketNotAuthSuccess(basketItem));
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
         if (axios.isAxiosError(error)) {
            dispatch(basketSlice.actions.error(error.response?.data));
         } else
            dispatch(
               basketSlice.actions.error(
                  'Помилка отримання загальної кількості товарів в корзині',
               ),
            );
      }
   };

export const getTotalCountOfShoesInBasketNotAuth =
   () => (dispatch: AppDispatch) => {
      dispatch(
         basketSlice.actions.getTotalCountOfShoesInBasketNotAuthSuccess(),
      );
   };

export const getAllShoesOfBasket = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(basketSlice.actions.getBasketStart());
      const basket = await BasketReq.getAllInBasket();
      dispatch(basketSlice.actions.getAllShoesOfBasketSuccess(basket));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(basketSlice.actions.getBasketError(error.response?.data));
      } else
         dispatch(
            basketSlice.actions.error(
               'Помилка отримання всього взуття яке знаходиться в корзині',
            ),
         );
   }
};

export const getAllShoesOfBasketNotAuth = () => (dispatch: AppDispatch) => {
   dispatch(basketSlice.actions.getAllShoesOfBasketNotAuthSuccess());
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
         if (axios.isAxiosError(error)) {
            dispatch(basketSlice.actions.error(error.response?.data));
         } else
            dispatch(
               basketSlice.actions.error(
                  'Помилка при видалені товарів з корзини',
               ),
            );
      }
   };
export const deleteOneShoesFromBasketNotAuth =
   (id: string) => (dispatch: AppDispatch) => {
      dispatch(basketSlice.actions.deleteOneShoesFromBasketNotAuthSuccess(id));
   };

export const deleteAllFromBasket = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(basketSlice.actions.start());
      await BasketReq.deleteAllFromBasket();
      dispatch(basketSlice.actions.deleteAllFromBasketSuccess());
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(basketSlice.actions.error(error.response?.data));
      } else
         dispatch(basketSlice.actions.error('Помилка при очищенні  корзини'));
   }
};
export const deleteAllFromBasketNotAuth =
   () => async (dispatch: AppDispatch) => {
      dispatch(basketSlice.actions.deleteAllFromBasketNotAuthSuccess());
   };

export const incrementCountOfOneShoesInBasket =
   (basketShoesId: string) => async (dispatch: AppDispatch) => {
      try {
         dispatch(basketSlice.actions.start());
         await BasketReq.incrementCountOfOneShoesInBasket(+basketShoesId);
         dispatch(
            basketSlice.actions.incrementCountOfOneShoesInBasketSuccess(
               basketShoesId,
            ),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(basketSlice.actions.error(error.response?.data));
         } else
            dispatch(
               basketSlice.actions.error(
                  'Помилка при збільшенні кількості товару в корзині',
               ),
            );
      }
   };

export const incrementCountOfOneShoesInBasketNotAuth =
   (id: string) => (dispatch: AppDispatch) => {
      dispatch(
         basketSlice.actions.incrementCountOfOneShoesInBasketNotAuthSuccess(id),
      );
   };

export const decrementCountOfOneShoesInBasket =
   (basketShoesId: string) => async (dispatch: AppDispatch) => {
      try {
         dispatch(basketSlice.actions.start());
         await BasketReq.decrementCountOfOneShoesInBasket(+basketShoesId);
         dispatch(
            basketSlice.actions.decrementCountOfOneShoesInBasketSuccess(
               basketShoesId,
            ),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(basketSlice.actions.error(error.response?.data));
         } else
            dispatch(
               basketSlice.actions.error(
                  'Помилка при зменшені кількості товарів в корзині',
               ),
            );
      }
   };

export const decrementCountOfOneShoesInBasketNotAuth =
   (id: string) => (dispatch: AppDispatch) => {
      dispatch(
         basketSlice.actions.decrementCountOfOneShoesInBasketNotAuthSuccess(id),
      );
   };
export const synchronizeBaskets =
   (shoes: IAddShoes[]) => async (dispatch: AppDispatch) => {
      try {
         dispatch(basketSlice.actions.start());
         await BasketReq.addALotShoesToBasket(shoes);
         const basketItems = await BasketReq.getAllInBasket();
         dispatch(
            basketSlice.actions.addShoesToBasketSuccess({
               basketItems,
               count: 0,
               message: 'Корзина успішно синхронізована',
            }),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(basketSlice.actions.error(error.response?.data.message));
         } else
            dispatch(
               basketSlice.actions.error('Помилка при синхронізувані корзин'),
            );
      }
   };
export const clearBasketBeforeLogOut = () => (dispatch: AppDispatch) => {
   dispatch(basketSlice.actions.clearBasketBeforeLogOut());
};
