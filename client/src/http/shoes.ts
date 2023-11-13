import { $host, $authHost } from '.';
import { IShoes } from '../store/reducers/shoes/ShoesSlice';

export interface IFilter {
   brandsId: number[];
}
export const getAllShoes = async ({ brandsId }: IFilter) => {
   const brandIdStringified = JSON.stringify(brandsId);
   const responseShoes = await $host.get<IShoes[]>('/shoes', {
      params: { brandsId: brandIdStringified },
   });
   const shoes = responseShoes.data;
   return shoes;
};

export const getShoesById = async (id: number) => {
   const responseShoes = await $host.get<IShoes>(`shoes/${id}`);
   const shoes = responseShoes.data;
   return shoes;
};

export const createShoesReq = (shoesData: FormData) =>
   $authHost.post('/shoes', shoesData);

export const updateShoesReq = (shoesData: FormData) =>
   $authHost.put('/shoes', shoesData);

export const deleteShoesByIdReq = async (id: number) => {
   await $authHost.delete<IShoes>(`shoes/${id}`);
};
