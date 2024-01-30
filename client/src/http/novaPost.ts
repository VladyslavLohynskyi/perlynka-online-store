import { $novaPostApi } from '.';
export interface IArea {
   Ref: string;
   Description: string;
   RegionType: string;
   AreaCenter: string;
}
class NovaPostReq {
   getAreas = async () => {
      const { data } = await $novaPostApi.post('', {
         modelName: 'Address',
         calledMethod: 'getSettlementAreas',
      });
      return data.data as IArea[];
   };
}

export default new NovaPostReq();
