import { $authHost } from '.';
import { IBasketItem } from '../store/reducers/basket/BasketSlice';
export interface IBasicResponse {
   message: string;
}
interface ITotalCountRes {
   totalCount: string;
}

export interface IAddShoes {
   shoId: number;
   sizeId: number;
   count: number;
}
class BasketReq {
   addShoesToBasket = async (shoId: number, sizeId: number, count: number) => {
      const shoesReq = JSON.stringify([{ shoId, sizeId, count }]);
      const { data } = await $authHost.post<IBasicResponse>('/basket', {
         shoes: shoesReq,
      });
      return data;
   };

   addALotShoesToBasket = async (shoes: IAddShoes[]) => {
      const shoesReq = JSON.stringify(shoes);
      const { data } = await $authHost.post<IBasicResponse>('/basket', {
         shoes: shoesReq,
      });
      return data;
   };

   getAllInBasket = async () => {
      const { data } = await $authHost.get<IBasketItem[]>('/basket');
      return data;
   };

   getTotalCountOfShoesInBasket = async () => {
      const { data } = await $authHost.get<ITotalCountRes>(
         '/basket/totalCount',
      );
      return +data.totalCount;
   };

   deleteOneShoesFromBasket = async (id: number, sizeId: number) => {
      const { data } = await $authHost.delete<IBasicResponse>(
         `/basket/${id}/${sizeId}`,
      );
      return data;
   };

   deleteAllFromBasket = async () => {
      const { data } = await $authHost.delete<IBasicResponse>(`/basket`);
      return data;
   };

   incrementCountOfOneShoesInBasket = async (basketShoesId: number) => {
      const { data } = await $authHost.put<IBasicResponse>(
         `/basket/increment`,
         { basketShoesId },
      );
      return data;
   };

   decrementCountOfOneShoesInBasket = async (basketShoesId: number) => {
      const { data } = await $authHost.put<IBasicResponse>(
         `/basket/decrement`,
         { basketShoesId },
      );
      return data;
   };
}

export default new BasketReq();
