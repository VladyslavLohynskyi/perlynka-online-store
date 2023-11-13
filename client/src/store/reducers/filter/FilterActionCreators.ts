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
