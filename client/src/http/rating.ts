import { $authHost, $host } from '.';
import { IBasicResponse } from './basket';

interface IGetAvgRatingResponse {
   avgRating: number;
   countRatings: number;
}
class RatingReq {
   addRating = async (shoId: number, rate: number) => {
      const { data } = await $authHost.post<IBasicResponse>('/rating', {
         shoId,
         rate,
      });
      return data;
   };
   getAvgRatingByShoesId = async (shoId: number) => {
      const { data } = await $host.get<IGetAvgRatingResponse>(
         '/rating/' + shoId,
      );
      return data;
   };
}

export default new RatingReq();
