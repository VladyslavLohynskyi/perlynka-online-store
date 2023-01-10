import { AppDispatch } from '../../store';
import { shoesSlice } from './ShoesSlice';
import { getAllShoes } from '../../../http/shoes';
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
         await createShoes(shoesData);
         const shoes = await getAllShoes();
         dispatch(shoesSlice.actions.shoesCreateSuccess([...shoes]));
      } catch (error) {
         dispatch(shoesSlice.actions.shoesCreateError('creating Shoes Error'));
      }
   };
