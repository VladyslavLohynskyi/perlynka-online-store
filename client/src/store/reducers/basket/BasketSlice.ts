import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShoes, ISizeCategory } from '../shoes/ShoesSlice';
import { getCookieValue } from '../filter/FilterSlice';

export interface IBasketItem {
   id: string;
   count: number;
   sho: IShoes;
   size: ISizeCategory;
}
interface IBasketState {
   basket: IBasketItem[];
   totalCountOfShoesInBasket: number;
   isLoading: boolean;
   error: string;
   message: string;
}

const initialState: IBasketState = {
   basket: [],
   totalCountOfShoesInBasket: 0,
   message: '',
   isLoading: true,
   error: '',
};
interface IAddShoesToBasketSuccess {
   basketItems: IBasketItem[];
   count: number;
   message: string;
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
         state.message = '';
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
         state.message = action.payload.message;
      },

      addShoesToBasketNotAuthSuccess(
         state,
         action: PayloadAction<IBasketItem>,
      ) {
         const existShoes = state.basket.find(
            (el) =>
               el.sho.id === action.payload.sho.id &&
               el.size.id === action.payload.size.id,
         );
         if (existShoes) {
            state.basket = state.basket.map((el) =>
               el.sho.id === action.payload.sho.id &&
               el.size.id === action.payload.size.id
                  ? { ...el, count: el.count + action.payload.count }
                  : el,
            );
         } else {
            state.basket = [...state.basket, action.payload];
         }
         state.totalCountOfShoesInBasket =
            state.totalCountOfShoesInBasket + action.payload.count;
         document.cookie = `basket=${JSON.stringify(state.basket)}; path=/;`;
         document.cookie = `totalCountOfShoesInBasket=${state.totalCountOfShoesInBasket}; path=/;`;
         state.message = 'Товар успішно додано в корзину';
      },

      getTotalCountOfShoesInBasketSuccess(
         state,
         action: PayloadAction<number>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.totalCountOfShoesInBasket = action.payload;
      },

      getTotalCountOfShoesInBasketNotAuthSuccess(state) {
         const totalCount = getCookieValue('totalCountOfShoesInBasket');
         if (totalCount) {
            state.totalCountOfShoesInBasket = +totalCount;
         }
      },

      getAllShoesOfBasketSuccess(state, action: PayloadAction<IBasketItem[]>) {
         state.isLoading = false;
         state.error = '';
         state.basket = [...action.payload];
      },
      getAllShoesOfBasketNotAuthSuccess(state) {
         const basket = JSON.parse(getCookieValue('basket') || '[]');
         state.basket = [...basket];
         const totalCount = getCookieValue('totalCountOfShoesInBasket');
         if (totalCount) {
            state.totalCountOfShoesInBasket = +totalCount;
         }
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

      deleteOneShoesFromBasketNotAuthSuccess(
         state,
         action: PayloadAction<string>,
      ) {
         const deleteItem = state.basket.find((el) => el.id === action.payload);
         if (deleteItem) {
            state.basket = state.basket.filter((el) => deleteItem.id !== el.id);
            state.totalCountOfShoesInBasket =
               state.totalCountOfShoesInBasket - +deleteItem.count;
         }
         document.cookie = `basket=${JSON.stringify(state.basket)}; path=/;`;
         document.cookie = `totalCountOfShoesInBasket=${state.totalCountOfShoesInBasket}; path=/;`;
      },

      deleteAllFromBasketSuccess(state) {
         state.isLoading = false;
         state.error = '';
         state.basket = [];
         state.totalCountOfShoesInBasket = 0;
      },

      deleteAllFromBasketNotAuthSuccess(state) {
         state.basket = [];
         state.totalCountOfShoesInBasket = 0;
         document.cookie = `basket=[]; path=/;`;
         document.cookie = `totalCountOfShoesInBasket=0; path=/;`;
      },

      incrementCountOfOneShoesInBasketSuccess(
         state,
         action: PayloadAction<string>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.basket = state.basket.map((el) =>
            el.id === action.payload ? { ...el, count: el.count + 1 } : el,
         );
         state.totalCountOfShoesInBasket += 1;
      },

      incrementCountOfOneShoesInBasketNotAuthSuccess(
         state,
         action: PayloadAction<string>,
      ) {
         state.basket = state.basket.map((el) =>
            el.id === action.payload ? { ...el, count: el.count + 1 } : el,
         );
         state.totalCountOfShoesInBasket += 1;
         document.cookie = `basket=${JSON.stringify(state.basket)}; path=/;`;
         document.cookie = `totalCountOfShoesInBasket=${state.totalCountOfShoesInBasket}; path=/;`;
      },

      decrementCountOfOneShoesInBasketSuccess(
         state,
         action: PayloadAction<string>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.basket = state.basket.map((el) =>
            el.id === action.payload ? { ...el, count: +el.count - 1 } : el,
         );
         state.totalCountOfShoesInBasket -= 1;
      },
      decrementCountOfOneShoesInBasketNotAuthSuccess(
         state,
         action: PayloadAction<string>,
      ) {
         state.basket = state.basket.map((el) =>
            el.id === action.payload ? { ...el, count: +el.count - 1 } : el,
         );
         state.totalCountOfShoesInBasket -= 1;
         document.cookie = `basket=${JSON.stringify(state.basket)}; path=/;`;
         document.cookie = `totalCountOfShoesInBasket=${state.totalCountOfShoesInBasket}; path=/;`;
      },

      clearBasketBeforeLogOut(state) {
         state.basket = [];
         document.cookie = 'basket= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
         state.totalCountOfShoesInBasket = 0;
         document.cookie =
            'totalCountOfShoesInBasket= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      },
      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default basketSlice.reducer;
