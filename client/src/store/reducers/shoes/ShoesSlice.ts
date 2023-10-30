import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export enum SexEnum {
   GIRL = 'Дівчинка',
   BOY = 'Хлопчик',
   UNISEX = 'Унісекс',
}
export interface IBasicCategory {
   id: string;
   name: string;
}

export interface ISizeCategory {
   id: string;
   size: string;
}
export interface ISize {
   count: number;
   shoId: number;
   sizeId: number;
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
   brandId: number;
   sizes: ISize[];
   sex: SexEnum;
}
export interface IShoesState {
   types: IBasicCategory[] | null;
   brands: IBasicCategory[] | null;
   colors: IBasicCategory[] | null;
   seasons: IBasicCategory[] | null;
   sizes: ISizeCategory[] | null;
   shoes: IShoes[];
   isLoading: boolean;
   error: string;
}

interface IPreloadList {
   types: IBasicCategory[];
   brands: IBasicCategory[];
   colors: IBasicCategory[];
   seasons: IBasicCategory[];
   shoes: IShoes[];
   sizes: ISizeCategory[];
}

const initialState: IShoesState = {
   types: null,
   brands: null,
   seasons: null,
   colors: null,
   shoes: [],
   sizes: null,
   isLoading: true,
   error: '',
};

export const shoesSlice = createSlice({
   name: 'shoes',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
      },

      shoesPreloadListSuccess(state, action: PayloadAction<IPreloadList>) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload.shoes;
         state.types = action.payload.types;
         state.seasons = action.payload.seasons;
         state.colors = action.payload.colors;
         state.brands = action.payload.brands;
         state.sizes = action.payload.sizes;
      },
      shoesPreloadListError(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },

      shoesCreateSuccess(state, action: PayloadAction<IShoes[]>) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload;
      },

      shoesUpdateSuccess(state, action: PayloadAction<IShoes[]>) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload;
      },

      shoesDeleteSuccess(state, action: PayloadAction<number>) {
         state.isLoading = false;
         state.error = '';
         state.shoes = state.shoes.filter((el) => el.id !== action.payload);
      },

      brandCreateSuccess(state, action: PayloadAction<IBasicCategory>) {
         state.isLoading = false;
         if (state.brands) {
            state.brands = [...state.brands, action.payload];
         }
      },

      brandUpdateSuccess(state, action: PayloadAction<IBasicCategory>) {
         state.isLoading = false;
         if (state.brands) {
            state.brands = state.brands.map((brand) => {
               if (brand.id === action.payload.id) {
                  return { ...brand, name: action.payload.name };
               } else return brand;
            });
         }
      },

      brandDeleteSuccess(state, action: PayloadAction<number>) {
         state.isLoading = false;
         state.shoes = state.shoes.filter(
            (el) => el.brandId !== action.payload,
         );
         if (state.brands) {
            state.brands = state.brands.filter(
               (brand) => +brand.id !== action.payload,
            );
         }
      },

      typeCreateSuccess(state, action: PayloadAction<IBasicCategory>) {
         state.isLoading = false;
         if (state.types) {
            state.types = [...state.types, action.payload];
         }
      },

      typeUpdateSuccess(state, action: PayloadAction<IBasicCategory>) {
         state.isLoading = false;
         if (state.types) {
            state.types = state.types.map((type) => {
               if (type.id === action.payload.id) {
                  return { ...type, name: action.payload.name };
               } else return type;
            });
         }
      },

      typeDeleteSuccess(state, action: PayloadAction<number>) {
         state.isLoading = false;
         state.shoes = state.shoes.filter((el) => el.typeId !== action.payload);
         if (state.types) {
            state.types = state.types.filter(
               (type) => +type.id !== action.payload,
            );
         }
      },

      seasonDeleteSuccess(state, action: PayloadAction<number>) {
         state.isLoading = false;
         state.shoes = state.shoes.filter(
            (el) => el.seasonId !== action.payload,
         );
         if (state.seasons) {
            state.seasons = state.seasons.filter(
               (season) => +season.id !== action.payload,
            );
         }
      },

      seasonCreateSuccess(state, action: PayloadAction<IBasicCategory>) {
         state.isLoading = false;
         if (state.seasons) {
            state.seasons = [...state.seasons, action.payload];
         }
      },

      seasonUpdateSuccess(state, action: PayloadAction<IBasicCategory>) {
         state.isLoading = false;
         if (state.seasons) {
            state.seasons = state.seasons.map((season) => {
               if (season.id === action.payload.id) {
                  return { ...season, name: action.payload.name };
               } else return season;
            });
         }
      },

      colorDeleteSuccess(state, action: PayloadAction<number>) {
         state.isLoading = false;
         state.shoes = state.shoes.filter(
            (el) => el.colorId !== action.payload,
         );
         if (state.colors) {
            state.colors = state.colors.filter(
               (color) => +color.id !== action.payload,
            );
         }
      },

      colorCreateSuccess(state, action: PayloadAction<IBasicCategory>) {
         state.isLoading = false;
         if (state.colors) {
            state.colors = [...state.colors, action.payload];
         }
      },

      colorUpdateSuccess(state, action: PayloadAction<IBasicCategory>) {
         state.isLoading = false;
         if (state.colors) {
            state.colors = state.colors.map((color) => {
               if (color.id === action.payload.id) {
                  return { ...color, name: action.payload.name };
               } else return color;
            });
         }
      },

      sizeCreateSuccess(state, action: PayloadAction<ISizeCategory>) {
         state.isLoading = false;
         if (state.sizes) {
            state.sizes = [...state.sizes, action.payload];
         }
      },
      sizeUpdateSuccess(state, action: PayloadAction<ISizeCategory>) {
         state.isLoading = false;
         if (state.sizes) {
            state.sizes = state.sizes.map((size) => {
               if (size.id === action.payload.id) {
                  return { ...size, size: action.payload.size };
               } else return size;
            });
         }
      },

      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export default shoesSlice.reducer;
