import { $host, $authHost } from '../../../http';
import jwt_decode from 'jwt-decode';
import { AppDispatch } from '../../store';
import { IBasicCategory, IShoes, shoesSlice } from './ShoesSlice';

export const preloadList = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(shoesSlice.actions.shoesPreloadList());
      const shoesResponse = await $host.get<IShoes[]>('/shoes');
      const shoes = shoesResponse.data;
      const brandsResponse = await $host.get<IBasicCategory[]>('/brand');
      const brands = brandsResponse.data;
      const typesResponse = await $host.get<IBasicCategory[]>('/type');
      const types = typesResponse.data;
      const colorsResponse = await $host.get<IBasicCategory[]>('/color');
      const colors = colorsResponse.data;
      const seasonsResponse = await $host.get<IBasicCategory[]>('/season');
      const seasons = seasonsResponse.data;

      dispatch(
         shoesSlice.actions.shoesPreloadListSuccess({
            shoes,
            brands,
            types,
            colors,
            seasons,
         }),
      );
   } catch (error) {
      dispatch(shoesSlice.actions.shoesPreloadListError('registration Error'));
   }
};
