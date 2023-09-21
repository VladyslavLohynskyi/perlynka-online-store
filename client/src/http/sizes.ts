import { $host } from '.';
import { ISizeCategory } from '../store/reducers/shoes/ShoesSlice';

export const getAllSizes = async () => {
   const sizesResponse = await $host.get<ISizeCategory[]>('/size');
   const sizes = sizesResponse.data;
   return sizes;
};
