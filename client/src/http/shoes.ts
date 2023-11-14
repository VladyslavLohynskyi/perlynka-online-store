import { $host, $authHost } from '.';
import { IShoes } from '../store/reducers/shoes/ShoesSlice';

export interface IFilter {
   brandsId: number[];
   typesId: number[];
}
export const getAllShoes = async ({ brandsId, typesId }: IFilter) => {
   const brandIdStringified = JSON.stringify(brandsId);
   const typesIdStringified = JSON.stringify(typesId);
   const responseShoes = await $host.get<IShoes[]>('/shoes', {
      params: { brandsId: brandIdStringified, typesId: typesIdStringified },
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
