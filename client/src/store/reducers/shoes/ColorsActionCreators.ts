import ColorReq from '../../../http/colors';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createColor = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newColor = await ColorReq.createElement(name);
      dispatch(shoesSlice.actions.colorCreateSuccess(newColor));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Color Error'));
   }
};

export const updateColor =
   (newColor: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const color = await ColorReq.updateElement(newColor);
         dispatch(shoesSlice.actions.colorUpdateSuccess(color));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Updating Color Error'));
      }
   };

export const deleteColor = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const color = await ColorReq.deleteElementById(id);

      dispatch(shoesSlice.actions.colorDeleteSuccess(+color.id));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Deleting Color Error'));
   }
};
