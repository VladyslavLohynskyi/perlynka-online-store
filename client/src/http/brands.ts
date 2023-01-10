import { $host } from '.';
import { IBasicCategory } from '../store/reducers/shoes/ShoesSlice';

export const getAllBrands = async () => {
   const brandsResponse = await $host.get<IBasicCategory[]>('/brand');
   const brands = brandsResponse.data;
   return brands;
};
