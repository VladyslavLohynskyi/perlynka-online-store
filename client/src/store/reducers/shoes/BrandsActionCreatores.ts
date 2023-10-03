import {
   createBrandReq,
   deleteBrandByIdReq,
   updateBrandReq,
} from '../../../http/brands';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createBrand = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newBrand = await createBrandReq(name);
      dispatch(shoesSlice.actions.brandCreateSuccess(newBrand));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Brand Error'));
   }
};

export const updateBrand =
   (newBrand: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const brand = await updateBrandReq(newBrand);
         dispatch(shoesSlice.actions.brandUpdateSuccess(brand));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Updating Brand Error'));
      }
   };

export const deleteBrand = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const brand = await deleteBrandByIdReq(id);

      dispatch(shoesSlice.actions.brandDeleteSuccess(+brand.id));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Deleting Brand Error'));
   }
};
