import SeasonReq from '../../../http/seasons';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createSeason = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newBrand = await SeasonReq.createElement(name);
      dispatch(shoesSlice.actions.seasonCreateSuccess(newBrand));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Season Error'));
   }
};

export const updateSeason =
   (newSeason: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const season = await SeasonReq.updateElement(newSeason);
         dispatch(shoesSlice.actions.seasonUpdateSuccess(season));
      } catch (error) {
         dispatch(shoesSlice.actions.error('UpdatingSeason Error'));
      }
   };

export const deleteSeason = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const season = await SeasonReq.deleteElementById(id);

      dispatch(shoesSlice.actions.seasonDeleteSuccess(+season.id));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Deleting Season Error'));
   }
};
