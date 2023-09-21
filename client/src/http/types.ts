import { $host } from '.';
import { IBasicCategory } from '../store/reducers/shoes/ShoesSlice';

export const getAllTypes = async () => {
   const typesResponse = await $host.get<IBasicCategory[]>('/type');
   const types = typesResponse.data;
   return types;
};
