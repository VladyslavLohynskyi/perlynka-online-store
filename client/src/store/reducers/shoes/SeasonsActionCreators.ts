import axios from 'axios';
import SeasonReq from '../../../http/seasons';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createSeason = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newSeason = await SeasonReq.createElement(name);
      dispatch(shoesSlice.actions.seasonCreateSuccess(newSeason));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при створенні сезону'),
         );
   }
};

export const updateSeason =
   (newSeason: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const season = await SeasonReq.updateElement(newSeason);
         dispatch(shoesSlice.actions.seasonUpdateSuccess(season));
      } catch (error) {
         if (axios.isAxiosError(error)) {
            dispatch(shoesSlice.actions.error(error.response?.data));
         } else
            dispatch(
               shoesSlice.actions.error(
                  'Невідома помилка при редагуванні сезону',
               ),
            );
      }
   };

export const deleteSeason = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const data = await SeasonReq.deleteElementById(id);

      dispatch(shoesSlice.actions.seasonDeleteSuccess(data));
   } catch (error) {
      if (axios.isAxiosError(error)) {
         dispatch(shoesSlice.actions.error(error.response?.data));
      } else
         dispatch(
            shoesSlice.actions.error('Невідома помилка при видаленні сезону'),
         );
   }
};
