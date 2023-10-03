import { $host, $authHost } from '.';
import { IBasicCategory } from '../store/reducers/shoes/ShoesSlice';
type BasicUrl = '/brand' | '/season' | '/type' | '/color';
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
      const brandsResponse = await $authHost.post<IBasicCategory>(this.url, {
         name,
      });
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

   updateElement = async (brand: IBasicCategory) => {
      await $authHost.put(this.url, brand);
      return brand;
   };

   deleteElementById = async (id: number) => {
      const brandResponse = await $authHost.delete<IBasicCategory>(
         this.url + '/' + id,
      );
      const deletedId = brandResponse.data;
      return deletedId;
   };
}
