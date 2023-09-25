import { createBrandReq } from '../../../http/brands';
import { AppDispatch } from '../../store';
import { shoesSlice } from './ShoesSlice';

export const createBrand = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.brandCreate());
      const newBrand = await createBrandReq(name);
      dispatch(shoesSlice.actions.brandCreateSuccess(newBrand));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Brand Error'));
   }
};
