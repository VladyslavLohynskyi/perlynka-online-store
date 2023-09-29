import { createBrandReq, updateBrandReq } from '../../../http/brands';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createBrand = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.brandCreate());
      const newBrand = await createBrandReq(name);
      dispatch(shoesSlice.actions.brandCreateSuccess(newBrand));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Brand Error'));
   }
};

export const updateBrand =
   (newBrand: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.brandUpdate());
         const brand = await updateBrandReq(newBrand);

         dispatch(shoesSlice.actions.brandUpdateSuccess(brand));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Updating Brand Error'));
      }
   };
