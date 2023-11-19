import { $host, $authHost } from '.';
import { IShoes, SexEnum } from '../store/reducers/shoes/ShoesSlice';

export interface IFilter {
   brandsId: number[];
   typesId: number[];
   seasonsId: number[];
   colorsId: number[];
   sex: SexEnum;
   sizesId: number[];
}
export const getAllShoes = async ({
   brandsId,
   typesId,
   seasonsId,
   colorsId,
   sex,
   sizesId,
}: IFilter) => {
   const brandIdStringified = JSON.stringify(brandsId);
   const typesIdStringified = JSON.stringify(typesId);
   const seasonsIdStringified = JSON.stringify(seasonsId);
   const colorsIdStringified = JSON.stringify(colorsId);
   const sizesIdStringified = JSON.stringify(sizesId);
   const responseShoes = await $host.get<IShoes[]>('/shoes', {
      params: {
         brandsId: brandIdStringified,
         typesId: typesIdStringified,
         seasonsId: seasonsIdStringified,
         colorsId: colorsIdStringified,
         sex,
         sizesId: sizesIdStringified,
      },
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
