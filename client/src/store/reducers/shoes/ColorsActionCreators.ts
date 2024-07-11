import axios from 'axios';
import ColorReq from '../../../http/colors';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createColor = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newColor = await ColorReq.createElement(name);
      dispatch(shoesSlice.actions.colorCreateSuccess(newColor));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при створенні кольору'),
         );
   }
};

export const updateColor =
   (newColor: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const color = await ColorReq.updateElement(newColor);
         dispatch(shoesSlice.actions.colorUpdateSuccess(color));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(shoesSlice.actions.error(error.response?.data));
         } else
            dispatch(
               shoesSlice.actions.error(
                  'Невідома помилка при редагуванні кольору',
               ),
            );
      }
   };

export const deleteColor = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const data = await ColorReq.deleteElementById(id);

      dispatch(shoesSlice.actions.colorDeleteSuccess(data));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при видаленні кольору'),
         );
   }
};
