import {
   createTypeReq,
   deleteTypeByIdReq,
   updateTypeReq,
} from '../../../http/types';
import { AppDispatch } from '../../store';
import { IBasicCategory, shoesSlice } from './ShoesSlice';

export const createType = (name: string) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const newType = await createTypeReq(name);
      dispatch(shoesSlice.actions.typeCreateSuccess(newType));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Creating Type Error'));
   }
};

export const updateType =
   (type: IBasicCategory) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const newType = await updateTypeReq(type);
         dispatch(shoesSlice.actions.typeUpdateSuccess(newType));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Updating Type Error'));
      }
   };

export const deleteType = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      const type = await deleteTypeByIdReq(id);
      dispatch(shoesSlice.actions.typeDeleteSuccess(+type.id));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Deleting Brand Error'));
   }
};
