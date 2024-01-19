import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShoes, ISizeCategory } from '../shoes/ShoesSlice';

export interface IBasketItem {
   id: string;
   basketId: string;
   count: string;
   sho: IShoes;
   size: ISizeCategory;
}
interface IBasketState {
   basket: IBasketItem[];
   totalCountOfShoesInBasket: number;
   isLoading: boolean;
   error: string;
}

const initialState: IBasketState = {
   basket: [],
   totalCountOfShoesInBasket: 0,
   isLoading: true,
   error: '',
};
interface IAddShoesToBasketSuccess {
   basketItems: IBasketItem[];
   count: number;
}

interface IDeleteOneShoesFromBasketSuccessPayload {
   id: number;
   sizeId: number;
}
export const basketSlice = createSlice({
   name: 'basket',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
      },
      addShoesToBasketSuccess(
         state,
         action: PayloadAction<IAddShoesToBasketSuccess>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.basket = [...action.payload.basketItems];
         state.totalCountOfShoesInBasket =
            state.totalCountOfShoesInBasket + action.payload.count;
      },

      getTotalCountOfShoesInBasketSuccess(
         state,
         action: PayloadAction<number>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.totalCountOfShoesInBasket = action.payload;
      },
      getAllShoesOfBasketSuccess(state, action: PayloadAction<IBasketItem[]>) {
         state.isLoading = false;
         state.error = '';
         state.basket = [...action.payload];
      },
      deleteOneShoesFromBasketSuccess(
         state,
         action: PayloadAction<IDeleteOneShoesFromBasketSuccessPayload>,
      ) {
         state.isLoading = false;
         state.error = '';
         const deleteItem = state.basket.find(
            (el) =>
               el.sho.id === action.payload.id &&
               +el.size.id === action.payload.sizeId,
         );
         if (deleteItem) {
            state.basket = state.basket.filter((el) => deleteItem.id !== el.id);
            state.totalCountOfShoesInBasket =
               state.totalCountOfShoesInBasket - +deleteItem.count;
         }
      },

      deleteAllFromBasketSuccess(state) {
         state.isLoading = false;
         state.error = '';
         state.basket = [];
         state.totalCountOfShoesInBasket = 0;
      },

      incrementCountOfOneShoesInBasketSuccess(
         state,
         action: PayloadAction<number>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.basket = state.basket.map((el) =>
            +el.id === action.payload ? { ...el, count: el.count + 1 } : el,
         );
         state.totalCountOfShoesInBasket += 1;
      },
      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default basketSlice.reducer;
