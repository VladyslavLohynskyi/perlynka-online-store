import { AppDispatch } from '../../store';
import { filterSlice } from './FilterSlice';

export const brandFilter = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(filterSlice.actions.start());
      dispatch(filterSlice.actions.brandFilterSuccess(id));
   } catch (error) {
      dispatch(filterSlice.actions.error('Brand Filter Error'));
   }
};

export const typeFilter = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(filterSlice.actions.start());
      dispatch(filterSlice.actions.typeFilterSuccess(id));
   } catch (error) {
      dispatch(filterSlice.actions.error('Type Filter Error'));
   }
};

export const seasonFilter = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(filterSlice.actions.start());
      dispatch(filterSlice.actions.seasonFilterSuccess(id));
   } catch (error) {
      dispatch(filterSlice.actions.error('Season Filter Error'));
   }
};
