import { $authHost, $host } from '.';
import { IBasicResponse } from './basket';
interface ICreateSlideResponse extends IBasicResponse {
   slide: ISlide;
   url: string;
}
interface IGetSlidesResponse extends IBasicResponse {
   slides: ISlide[];
}
export interface ISlide {
   id: number;
   alt: string;
   img: string;
   link: string | null;
}
class mainCarouselReq {
   createSlide = async (slideData: FormData) => {
      const { data } = await $authHost.post<ICreateSlideResponse>(
         '/main-carousel/',
         slideData,
      );
      return data;
   };

   getSlides = async () => {
      const { data } = await $host.get<IGetSlidesResponse>('/main-carousel/');
      return data;
   };

   deleteSlide = async (id: number) => {
      const { data } = await $authHost.delete<IBasicResponse>(
         '/main-carousel/' + id,
      );
      return data;
   };
}

export default new mainCarouselReq();
