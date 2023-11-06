import { AppDispatch } from '../../store';
import { filterSlice } from './FilterSlice';

export const brandFilter = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(filterSlice.actions.start());
      dispatch(filterSlice.actions.brandFilterSuccess(name));
   } catch (error) {
      dispatch(filterSlice.actions.error('Brand Filter Error'));
   }
};
