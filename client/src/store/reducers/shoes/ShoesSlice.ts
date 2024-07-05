import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
   BasicCategoryDeleteResponse,
   BasicCategoryResponse,
} from '../../../http/basic';
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
   img: string;
   typeId: number;
   colorId: number;
   seasonId: number;
   brandId: number;
   sex: SexEnum;
}

export interface IShoesWithSizes extends IShoes {
   shoes_sizes: ISize[];
}
export interface IShoesState {
   types: IBasicCategory[] | null;
   brands: IBasicCategory[] | null;
   colors: IBasicCategory[] | null;
   seasons: IBasicCategory[] | null;
   sizes: ISizeCategory[] | null;
   shoes: IShoesWithSizes[];
   countOfShoesModels: number;
   isLoading: boolean;
   error: string;
   message: string;
}

interface IPreloadList {
   types: IBasicCategory[];
   brands: IBasicCategory[];
   colors: IBasicCategory[];
   seasons: IBasicCategory[];
   sizes: ISizeCategory[];
}

const initialState: IShoesState = {
   types: null,
   brands: null,
   seasons: null,
   colors: null,
   shoes: [],
   sizes: null,
   countOfShoesModels: 0,
   isLoading: true,
   error: '',
   message: '',
};

export const shoesSlice = createSlice({
   name: 'shoes',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
         state.message = '';
      },

      shoesPreloadListSuccess(state, action: PayloadAction<IPreloadList>) {
         state.isLoading = false;
         state.error = '';
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

      shoesCreateSuccess(
         state,
         action: PayloadAction<{
            count: number;
            rows: IShoesWithSizes[];
            message: string;
         }>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload.rows;
         state.countOfShoesModels = action.payload.count;
         state.message = action.payload.message;
      },

      shoesUpdateSuccess(
         state,
         action: PayloadAction<{
            count: number;
            rows: IShoesWithSizes[];
            message: string;
         }>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.shoes = action.payload.rows;
         state.countOfShoesModels = action.payload.count;
         state.message = action.payload.message;
      },

      shoesDeleteSuccess(
         state,
         action: PayloadAction<{ id: number; message: string }>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.shoes = state.shoes.filter((el) => el.id !== action.payload.id);
         state.message = action.payload.message;
      },

      brandCreateSuccess(state, action: PayloadAction<BasicCategoryResponse>) {
         state.isLoading = false;
         if (state.brands) {
            state.brands = [...state.brands, action.payload.element];
            state.message = action.payload.message;
         }
      },

      brandUpdateSuccess(state, action: PayloadAction<BasicCategoryResponse>) {
         state.isLoading = false;
         if (state.brands) {
            state.brands = state.brands.map((brand) => {
               if (brand.id === action.payload.element.id) {
                  return { ...brand, name: action.payload.element.name };
               } else return brand;
            });
         }
         state.message = action.payload.message;
      },

      brandDeleteSuccess(
         state,
         action: PayloadAction<BasicCategoryDeleteResponse>,
      ) {
         state.isLoading = false;
         state.shoes = state.shoes.filter(
            (el) => el.brandId !== action.payload.id,
         );
         if (state.brands) {
            state.brands = state.brands.filter(
               (brand) => +brand.id !== action.payload.id,
            );
         }
         state.message = action.payload.message;
      },

      typeCreateSuccess(state, action: PayloadAction<BasicCategoryResponse>) {
         state.isLoading = false;
         if (state.types) {
            state.types = [...state.types, action.payload.element];
            state.message = action.payload.message;
         }
      },

      typeUpdateSuccess(state, action: PayloadAction<BasicCategoryResponse>) {
         state.isLoading = false;
         if (state.types) {
            state.types = state.types.map((type) => {
               if (type.id === action.payload.element.id) {
                  return { ...type, name: action.payload.element.name };
               } else return type;
            });
         }
         state.message = action.payload.message;
      },

      typeDeleteSuccess(
         state,
         action: PayloadAction<BasicCategoryDeleteResponse>,
      ) {
         state.isLoading = false;
         state.shoes = state.shoes.filter(
            (el) => el.typeId !== action.payload.id,
         );
         if (state.types) {
            state.types = state.types.filter(
               (type) => +type.id !== action.payload.id,
            );
         }
         state.message = action.payload.message;
      },

      seasonDeleteSuccess(
         state,
         action: PayloadAction<BasicCategoryDeleteResponse>,
      ) {
         state.isLoading = false;
         state.shoes = state.shoes.filter(
            (el) => el.seasonId !== action.payload.id,
         );
         if (state.seasons) {
            state.seasons = state.seasons.filter(
               (season) => +season.id !== action.payload.id,
            );
         }
         state.message = action.payload.message;
      },

      seasonCreateSuccess(state, action: PayloadAction<BasicCategoryResponse>) {
         state.isLoading = false;
         if (state.seasons) {
            state.seasons = [...state.seasons, action.payload.element];
            state.message = action.payload.message;
         }
      },

      seasonUpdateSuccess(state, action: PayloadAction<BasicCategoryResponse>) {
         state.isLoading = false;
         if (state.seasons) {
            state.seasons = state.seasons.map((season) => {
               if (season.id === action.payload.element.id) {
                  return { ...season, name: action.payload.element.name };
               } else return season;
            });
         }
         state.message = action.payload.message;
      },

      colorDeleteSuccess(
         state,
         action: PayloadAction<BasicCategoryDeleteResponse>,
      ) {
         state.isLoading = false;
         state.shoes = state.shoes.filter(
            (el) => el.colorId !== action.payload.id,
         );
         if (state.colors) {
            state.colors = state.colors.filter(
               (color) => +color.id !== action.payload.id,
            );
         }
         state.message = action.payload.message;
      },

      colorCreateSuccess(state, action: PayloadAction<BasicCategoryResponse>) {
         state.isLoading = false;
         if (state.colors) {
            state.colors = [...state.colors, action.payload.element];
            state.message = action.payload.message;
         }
      },

      colorUpdateSuccess(state, action: PayloadAction<BasicCategoryResponse>) {
         state.isLoading = false;
         if (state.colors) {
            state.colors = state.colors.map((color) => {
               if (color.id === action.payload.element.id) {
                  return { ...color, name: action.payload.element.name };
               } else return color;
            });
         }
         state.message = action.payload.message;
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
      sizeDeleteSuccess(state, action: PayloadAction<number>) {
         state.isLoading = false;
         if (state.sizes) {
            state.sizes = state.sizes.filter(
               (size) => +size.id !== action.payload,
            );
         }
      },

      shoesGetAll(
         state,
         action: PayloadAction<{ count: number; rows: IShoesWithSizes[] }>,
      ) {
         state.isLoading = false;
         state.shoes = action.payload.rows;
         state.countOfShoesModels = action.payload.count;
      },

      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
         state.message = '';
      },
   },
});

export default shoesSlice.reducer;
