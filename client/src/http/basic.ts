import { $host, $authHost } from '.';
import { IBasicCategory } from '../store/reducers/shoes/ShoesSlice';
import { IBasicResponse } from './basket';
type BasicUrl = '/brand' | '/season' | '/type' | '/color';

export type BasicCategoryResponse = {
   element: IBasicCategory;
} & IBasicResponse;

export type BasicCategoryDeleteResponse = { id: number } & IBasicResponse;
export default class BasicReq {
   url: BasicUrl;
   constructor(url: BasicUrl) {
      this.url = url;
   }
   getAllElements = async () => {
      const brandsResponse = await $host.get<IBasicCategory[]>(this.url);
      const brands = brandsResponse.data;
      return brands;
   };

   createElement = async (name: string) => {
      const brandsResponse = await $authHost.post<BasicCategoryResponse>(
         this.url,
         {
            name,
         },
      );
      const brand = brandsResponse.data;
      return brand;
   };
   getElementById = async (id: number) => {
      const brandResponse = await $host.get<IBasicCategory>(
         this.url + '/' + id,
      );
      const deletedId = brandResponse.data;
      return deletedId;
   };

   updateElement = async (element: IBasicCategory) => {
      const { data } = await $authHost.put<IBasicResponse>(this.url, element);
      return { element, message: data.message };
   };

   deleteElementById = async (id: number) => {
      const { data } = await $authHost.delete<BasicCategoryDeleteResponse>(
         this.url + '/' + id,
      );
      return data;
   };
}
