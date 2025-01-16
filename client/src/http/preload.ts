import { $host } from '.';
import { IPreloadList } from '../store/reducers/shoes/ShoesSlice';

class PreloadReq {
   getPreloadList = async () => {
      const preloadResponse = await $host.get<IPreloadList>('/preload');
      const preloadData = preloadResponse.data;
      return preloadData;
   };
}

export default new PreloadReq();
