import SizeReq from '../../../http/sizes';
import { AppDispatch } from '../../store';
import { shoesSlice } from './ShoesSlice';

export const createSize = (size: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newSize = await SizeReq.createSize(size);
      dispatch(shoesSlice.actions.sizeCreateSuccess(newSize));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Brand Error'));
   }
};
