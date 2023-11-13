import { AppDispatch } from '../../store';
import { shoesSlice } from './ShoesSlice';
import {
   IFilter,
   createShoesReq,
   deleteShoesByIdReq,
   getAllShoes,
   updateShoesReq,
} from '../../../http/shoes';
import BrandReq from '../../../http/brands';
import TypeReq from '../../../http/types';
import ColorReq from '../../../http/colors';
import SeasonReq from '../../../http/seasons';
import { getAllSizes } from '../../../http/sizes';

export const preloadList = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());

      const brands = await BrandReq.getAllElements();
      const types = await TypeReq.getAllElements();
      const colors = await ColorReq.getAllElements();
      const seasons = await SeasonReq.getAllElements();
      const sizes = await getAllSizes();

      dispatch(
         shoesSlice.actions.shoesPreloadListSuccess({
            brands,
            types,
            colors,
            seasons,
            sizes,
         }),
      );
   } catch (error) {
      dispatch(shoesSlice.actions.shoesPreloadListError('registration Error'));
   }
};
export const createShoes =
   (shoesData: FormData) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         await createShoesReq(shoesData);
         const shoes = await getAllShoes({ brandsId: [] });
         dispatch(shoesSlice.actions.shoesCreateSuccess([...shoes]));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Creating Shoes Error'));
      }
   };

export const updateShoes =
   (shoesData: FormData) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         await updateShoesReq(shoesData);
         const shoes = await getAllShoes({ brandsId: [] });
         dispatch(shoesSlice.actions.shoesUpdateSuccess([...shoes]));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Updating Shoes Error'));
      }
   };

export const deleteShoes = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.start());
      await deleteShoesByIdReq(id);
      dispatch(shoesSlice.actions.shoesDeleteSuccess(id));
   } catch (error) {
      dispatch(shoesSlice.actions.error('Deleting Shoes Error'));
   }
};

export const getAllShoesByFilter =
   ({ brandsId }: IFilter) =>
   async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.start());
         const shoes = await getAllShoes({ brandsId });
         dispatch(shoesSlice.actions.shoesGetAll(shoes));
      } catch (error) {
         dispatch(shoesSlice.actions.error('Getting Shoes Error'));
      }
   };
