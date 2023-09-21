import { $host } from '.';
import { IBasicCategory } from '../store/reducers/shoes/ShoesSlice';

export const getAllColors = async () => {
   const colorsResponse = await $host.get<IBasicCategory[]>('/color');
   const colors = colorsResponse.data;
   return colors;
};
