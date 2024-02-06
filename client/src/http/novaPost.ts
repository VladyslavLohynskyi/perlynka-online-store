import { $novaPostApi } from '.';
export interface IArea {
   Ref: string;
   Description: string;
   RegionType: string;
   AreaCenter: string;
}

export interface ICity {
   Ref: string;
   SettlementType: string;
   Latitude: string;
   Longitude: string;
   Description: string;
   SettlementTypeDescription: string;
   Region: string;
   RegionsDescription: string;
   Area: string;
   AreaDescription: string;
}
class NovaPostReq {
   getAreas = async () => {
      const { data } = await $novaPostApi.post('', {
         modelName: 'Address',
         calledMethod: 'getSettlementAreas',
      });
      return data.data as IArea[];
   };
   getCities = async (areaRef: string, cityName: string) => {
      console.log(areaRef, cityName);
      const { data } = await $novaPostApi.post('', {
         modelName: 'Address',
         calledMethod: 'getSettlements',
         methodProperties: {
            AreaRef: areaRef,
            Warehouse: '1',
            FindByString: cityName,
         },
      });

      return data.data as ICity[];
   };
}

export default new NovaPostReq();
