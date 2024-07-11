import axios from 'axios';
import BrandReq from '../../../http/brands';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createBrand = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newBrand = await BrandReq.createElement(name);
      dispatch(shoesSlice.actions.brandCreateSuccess(newBrand));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при створенні бренду'),
         );
   }
};

export const updateBrand =
   (newBrand: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const brand = await BrandReq.updateElement(newBrand);
         dispatch(shoesSlice.actions.brandUpdateSuccess(brand));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(shoesSlice.actions.error(error.response?.data));
         } else
            dispatch(
               shoesSlice.actions.error(
                  'Невідома помилка при редагуванні бренду',
               ),
            );
      }
   };

export const deleteBrand = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const data = await BrandReq.deleteElementById(id);
      dispatch(shoesSlice.actions.brandDeleteSuccess(data));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при видаленні бренду'),
         );
   }
};
