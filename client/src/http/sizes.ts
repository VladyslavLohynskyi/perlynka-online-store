import { $host, $authHost } from '.';
import { ISizeCategory } from '../store/reducers/shoes/ShoesSlice';
import { IBasicResponse } from './basket';

export const getAllSizes = async () => {
   const sizesResponse = await $host.get<ISizeCategory[]>('/size');
   const sizes = sizesResponse.data;
   return sizes;
};

export type BasicSizeResponse = { size: ISizeCategory; message: string };

class SizeReq {
   getAllSizes = async () => {
      const sizesResponse = await $host.get<ISizeCategory[]>('/size');
      const sizes = sizesResponse.data;
      return sizes;
   };

   createSize = async (size: number) => {
      const { data } = await $authHost.post<BasicSizeResponse>('/size', {
         size,
      });
      return data;
   };
   getSizeById = async (id: number) => {
      const brandResponse = await $host.get<ISizeCategory>('/size/' + id);
      const size = brandResponse.data;
      return size;
   };

   updateSize = async (size: ISizeCategory) => {
      const { data } = await $authHost.put<IBasicResponse>('/size', size);
      return { size, message: data.message };
   };

   deleteSizeById = async (id: number) => {
      const { data } = await $authHost.delete<BasicSizeResponse>('/size/' + id);
      return { id, message: data.message };
   };
}

export default new SizeReq();
