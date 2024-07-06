import axios from 'axios';
import SizeReq from '../../../http/sizes';
import { AppDispatch } from '../../store';
import { ISizeCategory, shoesSlice } from './ShoesSlice';

export const createSize = (size: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newSize = await SizeReq.createSize(size);
      dispatch(shoesSlice.actions.sizeCreateSuccess(newSize));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при створенні розміру'),
         );
   }
};

export const updateSize =
   (sizeObg: ISizeCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const data = await SizeReq.updateSize(sizeObg);
         dispatch(shoesSlice.actions.sizeUpdateSuccess(data));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(shoesSlice.actions.error(error.response?.data));
         } else
            dispatch(
               shoesSlice.actions.error(
                  'Невідома помилка при оновленні розміру',
               ),
            );
      }
   };

export const deleteSize = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const data = await SizeReq.deleteSizeById(id);
      dispatch(shoesSlice.actions.sizeDeleteSuccess(data));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при видаленні розміру'),
         );
   }
};
