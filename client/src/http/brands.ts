import { $host, $authHost } from '.';
import { IBasicCategory } from '../store/reducers/shoes/ShoesSlice';

export const getAllBrands = async () => {
   const brandsResponse = await $host.get<IBasicCategory[]>('/brand');
   const brands = brandsResponse.data;
   return brands;
};

export const createBrandReq = async (name: string) => {
   const brandsResponse = await $authHost.post<IBasicCategory>('/brand', {
      name,
   });
   const brand = brandsResponse.data;
   return brand;
};
