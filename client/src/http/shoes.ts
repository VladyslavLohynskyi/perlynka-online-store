import { $host, $authHost } from '.';
import { IShoesInfo } from '../modules/modal/components/HeaderDropdown';
import { SortEnum } from '../store/reducers/filter/FilterSlice';
import {
   IBasicCategory,
   IShoesWithSizes,
   ISize,
   ISizeCategory,
   SexEnum,
} from '../store/reducers/shoes/ShoesSlice';
import { IBasicResponse } from './basket';

export interface IFilter {
   brandsId: number[];
   typesId: number[];
   seasonsId: number[];
   colorsId: number[];
   sex: SexEnum;
   sizesId: number[];
   sortBy: SortEnum;
   offset: number;
   limit: number;
}
interface IParticularSize extends ISize {
   sizeId: number;
   size: ISizeCategory;
}
export interface IShoesImage {
   id: number;
   img: string;
   shoId: number;
}
export interface IParticularShoes extends IShoesWithSizes {
   type: IBasicCategory;
   season: IBasicCategory;
   brand: IBasicCategory;
   color: IBasicCategory;
   shoes_sizes: IParticularSize[];
   shoes_infos: IShoesInfo[];
   shoes_images: IShoesImage[];
}
export const getAllShoes = async ({
   brandsId,
   typesId,
   seasonsId,
   colorsId,
   sex,
   sizesId,
   sortBy,
   offset,
   limit,
}: IFilter) => {
   const brandIdStringified = JSON.stringify(brandsId);
   const typesIdStringified = JSON.stringify(typesId);
   const seasonsIdStringified = JSON.stringify(seasonsId);
   const colorsIdStringified = JSON.stringify(colorsId);
   const sizesIdStringified = JSON.stringify(sizesId);
   const responseShoes = await $host.get<{
      count: number;
      rows: IShoesWithSizes[];
   }>('/shoes', {
      params: {
         brandsId: brandIdStringified,
         typesId: typesIdStringified,
         seasonsId: seasonsIdStringified,
         colorsId: colorsIdStringified,
         sex,
         sortBy,
         offset,
         limit,
         sizesId: sizesIdStringified,
      },
   });
   const shoes = responseShoes.data;
   return shoes;
};

export const getShoesById = async (id: number) => {
   const responseShoes = await $host.get<IParticularShoes>(`shoes/${id}`);
   const shoes = responseShoes.data;
   return shoes;
};

export const createShoesReq = async (shoesData: FormData) => {
   const { data } = await $authHost.post<IBasicResponse>('/shoes', shoesData);
   return data;
};

export const updateShoesReq = async (shoesData: FormData) => {
   const { data } = await $authHost.put<IBasicResponse>('/shoes', shoesData);
   return data;
};

export const deleteShoesByIdReq = async (id: number) => {
   const { data } = await $authHost.delete<IBasicResponse>(`shoes/${id}`);
   return data;
};
