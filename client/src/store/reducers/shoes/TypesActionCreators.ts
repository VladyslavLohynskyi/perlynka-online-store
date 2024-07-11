import axios from 'axios';
import TypeReq from '../../../http/types';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createType = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newType = await TypeReq.createElement(name);
      dispatch(shoesSlice.actions.typeCreateSuccess(newType));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при створенні типу'),
         );
   }
};

export const updateType =
   (type: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const newType = await TypeReq.updateElement(type);
         dispatch(shoesSlice.actions.typeUpdateSuccess(newType));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(shoesSlice.actions.error(error.response?.data));
         } else
            dispatch(
               shoesSlice.actions.error(
                  'Невідома помилка при редагуванні типу',
               ),
            );
      }
   };

export const deleteType = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const data = await TypeReq.deleteElementById(id);
      dispatch(shoesSlice.actions.typeDeleteSuccess(data));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при видаленні типу'),
         );
   }
};
