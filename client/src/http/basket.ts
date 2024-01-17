import { $authHost } from '.';
import { IBasketItem } from '../store/reducers/basket/BasketSlice';
interface IBasicResponse {
   message: string;
}
class BasketReq {
   addShoesToBasket = async (shoId: number, sizeId: number, count: number) => {
      const { data } = await $authHost.post<IBasicResponse>('/basket', {
         shoId,
         sizeId,
         count,
      });
      return data;
   };

   getAllInBasket = async () => {
      const { data } = await $authHost.get<IBasketItem[]>('/basket');
      return data;
   };
}

export default new BasketReq();
