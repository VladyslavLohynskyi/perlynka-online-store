import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { slice } from 'lodash';

interface IMainCarouselState {
   slides: ISlide[];
   isLoading: boolean;
   error: string;
   message: string;
}

export interface ISlide {
   id: number;
   alt: string;
   link: string | null;
   img: string;
}

const initialState: IMainCarouselState = {
   slides: [],
   isLoading: true,
   error: '',
   message: '',
};

export const mainCarouselSlice = createSlice({
   name: 'main-carousel',
   initialState,
   reducers: {
      start(state) {
         state.isLoading = true;
         state.error = '';
         state.message = '';
      },
      getSlidesSuccess(
         state,
         action: PayloadAction<{ message: string; slides: ISlide[] }>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.slides = [...action.payload.slides];
      },
      createSlideSuccess(
         state,
         action: PayloadAction<{ message: string; slide: ISlide }>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.slides = [...state.slides, action.payload.slide];
         state.message = action.payload.message;
      },

      deleteSlideSuccess(
         state,
         action: PayloadAction<{ message: string; slideId: number }>,
      ) {
         state.isLoading = false;
         state.error = '';
         state.slides = state.slides.filter(
            (el) => el.id !== action.payload.slideId,
         );
         state.message = action.payload.message;
      },

      error(state, action: PayloadAction<string>) {
         state.isLoading = false;
         state.error = action.payload;
         state.message = '';
      },
   },
});

export default mainCarouselSlice.reducer;
