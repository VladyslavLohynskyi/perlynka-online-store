import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IBasicCategory {
   id: string;
   name: string;
}

export interface IShoes {
   id: number;
   model: string;
   price: number;
   rating: number;
   img: string;
   typeId: number;
   colorId: number;
   seasonId: number;
   brand: IBasicCategory;
}
export interface IShoesState {
   types: IBasicCategory[] | null;
   brands: IBasicCategory[] | null;
   colors: IBasicCategory[] | null;
   seasons: IBasicCategory[] | null;
   shoes: IShoes[] | null;
   isLoading: boolean;
   error: string;
}

interface IPreloadList {
   types: IBasicCategory[];
   brands: IBasicCategory[];
   colors: IBasicCategory[];
   seasons: IBasicCategory[];
   shoes: IShoes[];
}

const initialState: IShoesState = {
   types: null,
   brands: null,
   seasons: null,
   colors: null,
   shoes: null,
   isLoading: true,
   error: '',
};

export const shoesSlice = createSlice({
   name: 'shoes',
   initialState,
   reducers: {
      shoesPreloadList(state) {
         state.isLoading = true;
         state.error = '';
      },
      shoesPreloadListSuccess(state, action: PayloadAction<IPreloadList>) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload.shoes;
         state.types = action.payload.types;
         state.seasons = action.payload.seasons;
         state.brands = action.payload.brands;
      },
      shoesPreloadListError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default shoesSlice.reducer;
