import SizeReq from '../../../http/sizes';
import { AppDispatch } from '../../store';
import { ISizeCategory, shoesSlice } from './ShoesSlice';

export const createSize = (size: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newSize = await SizeReq.createSize(size);
      dispatch(shoesSlice.actions.sizeCreateSuccess(newSize));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Brand Error'));
   }
};

export const updateSize =
   (sizeObg: ISizeCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         await SizeReq.updateSize(sizeObg);
         dispatch(shoesSlice.actions.sizeUpdateSuccess(sizeObg));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Updating Brand Error'));
      }
   };
