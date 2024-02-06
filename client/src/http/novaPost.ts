import { $novaPostApi } from '.';
export interface IArea {
   Ref: string;
   Description: string;
   RegionType: string;
   AreaCenter: string;
}

export interface ISettlement {
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
   getSettlements = async (areaRef: string, settlementName: string) => {
      const { data } = await $novaPostApi.post('', {
         modelName: 'Address',
         calledMethod: 'getSettlements',
         methodProperties: {
            AreaRef: areaRef,
            Warehouse: '1',
            FindByString: settlementName,
         },
      });

      return data.data as ISettlement[];
   };

   getWarehouses = async (settlementRef: string, warehouse: string) => {
      const { data } = await $novaPostApi.post('', {
         modelName: 'Address',
         calledMethod: 'getWarehouses',
         methodProperties: {
            SettlementRef: settlementRef,
            WarehouseId: warehouse,
         },
      });

      return data.data as ISettlement[];
   };
}

export default new NovaPostReq();
