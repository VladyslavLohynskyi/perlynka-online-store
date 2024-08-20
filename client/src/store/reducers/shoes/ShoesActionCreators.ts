import { AppDispatch } from '../../store';
import { shoesSlice } from './ShoesSlice';
import ShoesReq, { IFilter } from '../../../http/shoes';
import BrandReq from '../../../http/brands';
import TypeReq from '../../../http/types';
import ColorReq from '../../../http/colors';
import SeasonReq from '../../../http/seasons';
import { getAllSizes } from '../../../http/sizes';
import axios from 'axios';

export const preloadList = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());

      const brands = await BrandReq.getAllElements();
      const types = await TypeReq.getAllElements();
      const colors = await ColorReq.getAllElements();
      const seasons = await SeasonReq.getAllElements();
      const sizes = await getAllSizes();

      dispatch(
         shoesSlice.actions.shoesPreloadListSuccess({
            brands,
            types,
            colors,
            seasons,
            sizes,
         }),
      );
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.shoesPreloadListError(
               'Помилка при отриманні початкової інформації',
            ),
         );
   }
};
export const createShoes =
   (shoesData: FormData, filter: IFilter) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.shoesStart());
         const { message } = await ShoesReq.createShoesReq(shoesData);
         const shoes = await ShoesReq.getAllShoes(filter);
         dispatch(shoesSlice.actions.shoesCreateSuccess({ ...shoes, message }));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(shoesSlice.actions.shoesError(error.response?.data));
         } else
            dispatch(
               shoesSlice.actions.error('Помилка при створенні нового взуття'),
            );
      }
   };

export const updateShoes =
   (shoesData: FormData, filter: IFilter) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.shoesStart());
         const { message } = await ShoesReq.updateShoesReq(shoesData);
         const shoes = await ShoesReq.getAllShoes(filter);
         dispatch(
            shoesSlice.actions.shoesUpdateSuccess({
               ...shoes,
               message: message,
            }),
         );
      } catch (error) {
         if (axios.isAxiosError(error)) {
            return dispatch(
               shoesSlice.actions.shoesError(error.response?.data),
            );
         } else
            dispatch(
               shoesSlice.actions.error('Помилка при редагуванні взуття'),
            );
      }
   };

export const deleteShoes = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.shoesStart());
      const { message } = await ShoesReq.deleteShoesByIdReq(id);
      dispatch(shoesSlice.actions.shoesDeleteSuccess({ id, message }));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         return dispatch(shoesSlice.actions.shoesError(error.response?.data));
      } else
         dispatch(shoesSlice.actions.error('Помилка при видаленні  взуття'));
   }
};

export const getAllShoesByFilter =
   (filter: IFilter) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.shoesStart());
         const shoes = await ShoesReq.getAllShoes(filter);
         dispatch(shoesSlice.actions.shoesGetAll(shoes));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            return dispatch(
               shoesSlice.actions.shoesError(error.response?.data),
            );
         } else
            dispatch(
               shoesSlice.actions.error('Помилка при взуття з фітрацією'),
            );
      }
   };
