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

export const getBrandByIdReq = async (id: number) => {
   const brandResponse = await $host.get<IBasicCategory>('/brand/' + id);
   const deletedId = brandResponse.data;
   return deletedId;
};

export const updateBrandReq = async (brand: IBasicCategory) => {
   await $authHost.put('/brand', brand);
   return brand;
};
