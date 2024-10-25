import axios from 'axios';
import mainCarouselReq from '../../../http/mainCarousel';
import { AppDispatch } from '../../store';
import { mainCarouselSlice } from './MainCarouselSlice';

export const createMainCarouselSlide =
   (slideData: FormData) => async (dispatch: AppDispatch) => {
      try {
         dispatch(mainCarouselSlice.actions.start());
         const { slide, message } = await mainCarouselReq.createSlide(
            slideData,
         );
         dispatch(
            mainCarouselSlice.actions.createSlideSuccess({ slide, message }),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(mainCarouselSlice.actions.error(error.response?.data));
         } else
            dispatch(
               mainCarouselSlice.actions.error('Помилка при cтворенні слайдів'),
            );
      }
   };

export const getMainCarouselSlides = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(mainCarouselSlice.actions.start());
      const { slides, message } = await mainCarouselReq.getSlides();
      dispatch(mainCarouselSlice.actions.getSlidesSuccess({ slides, message }));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(mainCarouselSlice.actions.error(error.response?.data));
      } else
         dispatch(
            mainCarouselSlice.actions.error(
               'Помилка при отриманні списку слайдів',
            ),
         );
   }
};

export const deleteMainCarouselSlide =
   (slideId: number) => async (dispatch: AppDispatch) => {
      try {
         dispatch(mainCarouselSlice.actions.start());
         const { message } = await mainCarouselReq.deleteSlide(slideId);
         dispatch(
            mainCarouselSlice.actions.deleteSlideSuccess({ message, slideId }),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(mainCarouselSlice.actions.error(error.response?.data));
         } else
            dispatch(
               mainCarouselSlice.actions.error('Помилка при видаленні слайду'),
            );
      }
   };
