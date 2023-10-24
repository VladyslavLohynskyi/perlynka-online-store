import { $host, $authHost } from '.';
import { ISizeCategory } from '../store/reducers/shoes/ShoesSlice';

export const getAllSizes = async () => {
   const sizesResponse = await $host.get<ISizeCategory[]>('/size');
   const sizes = sizesResponse.data;
   return sizes;
};

class SizeReq {
   getAllSizes = async () => {
      const sizesResponse = await $host.get<ISizeCategory[]>('/size');
      const sizes = sizesResponse.data;
      return sizes;
   };

   createSize = async (size: number) => {
      const brandsResponse = await $authHost.post<ISizeCategory>('/size', {
         size,
      });
      const newSize = brandsResponse.data;
      return newSize;
   };
   getSizeById = async (id: number) => {
      const brandResponse = await $host.get<ISizeCategory>('/size/' + id);
      const size = brandResponse.data;
      return size;
   };

   updateSize = async (size: ISizeCategory) => {
      await $authHost.put('/size', size);
      return size;
   };

   deleteSizeById = async (id: number) => {
      await $authHost.delete<ISizeCategory>('/size/' + id);
      return id;
   };
}

export default new SizeReq();
