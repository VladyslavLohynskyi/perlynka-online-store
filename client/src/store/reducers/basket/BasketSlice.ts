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
   isLoading: boolean;
   error: string;
}

const initialState: IBasketState = {
   basket: [],
   isLoading: true,
   error: '',
};

export const basketSlice = createSlice({
   name: 'basket',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
      },
      addShoesToBasketSuccess(state, action: PayloadAction<IBasketItem[]>) {
         state.isLoading = false;
         state.error = '';
         state.basket = [...action.payload];
      },
      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default basketSlice.reducer;
