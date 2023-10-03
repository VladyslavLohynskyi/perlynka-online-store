import BrandReq from '../../../http/brands';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createBrand = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newBrand = await BrandReq.createElement(name);
      dispatch(shoesSlice.actions.brandCreateSuccess(newBrand));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Brand Error'));
   }
};

export const updateBrand =
   (newBrand: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const brand = await BrandReq.updateElement(newBrand);
         dispatch(shoesSlice.actions.brandUpdateSuccess(brand));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Updating Brand Error'));
      }
   };

export const deleteBrand = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const brand = await BrandReq.deleteElementById(id);

      dispatch(shoesSlice.actions.brandDeleteSuccess(+brand.id));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Deleting Brand Error'));
   }
};
