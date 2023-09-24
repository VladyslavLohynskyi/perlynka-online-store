import { AppDispatch } from '../../store';
import { shoesSlice } from './ShoesSlice';
import {
   createShoesReq,
   deleteShoesByIdReq,
   getAllShoes,
   updateShoesReq,
} from '../../../http/shoes';
import { getAllBrands } from '../../../http/brands';
import { getAllTypes } from '../../../http/types';
import { getAllColors } from '../../../http/colors';
import { getAllSeasons } from '../../../http/seasons';
import { getAllSizes } from '../../../http/sizes';

export const preloadList = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.shoesPreloadList());
      const shoes = await getAllShoes();
      const brands = await getAllBrands();
      const types = await getAllTypes();
      const colors = await getAllColors();
      const seasons = await getAllSeasons();
      const sizes = await getAllSizes();

      dispatch(
         shoesSlice.actions.shoesPreloadListSuccess({
            shoes,
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
         dispatch(shoesSlice.actions.shoesCreate());
         await createShoesReq(shoesData);
         const shoes = await getAllShoes();
         dispatch(shoesSlice.actions.shoesCreateSuccess([...shoes]));
      } catch (error) {
         dispatch(shoesSlice.actions.shoesCreateError('Creating Shoes Error'));
      }
   };

export const updateShoes =
   (shoesData: FormData) => async (dispatch: AppDispatch) => {
      try {
         dispatch(shoesSlice.actions.shoesUpdate());
         await updateShoesReq(shoesData);
         const shoes = await getAllShoes();
         dispatch(shoesSlice.actions.shoesUpdateSuccess([...shoes]));
      } catch (error) {
         dispatch(shoesSlice.actions.shoesUpdateError('Updating Shoes Error'));
      }
   };

export const deleteShoes = (id: number) => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.shoesDelete());
      await deleteShoesByIdReq(id);
      dispatch(shoesSlice.actions.shoesDeleteSuccess(id));
   } catch (error) {
      dispatch(shoesSlice.actions.shoesUpdateError('Deleting Shoes Error'));
   }
};
