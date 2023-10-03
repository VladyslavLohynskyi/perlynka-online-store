import { $authHost, $host } from '.';
import { IBasicCategory } from '../store/reducers/shoes/ShoesSlice';

export const getAllTypes = async () => {
   const typesResponse = await $host.get<IBasicCategory[]>('/type');
   const types = typesResponse.data;
   return types;
};

export const createTypeReq = async (name: string) => {
   const typeResponse = await $authHost.post<IBasicCategory>('/type', { name });
   const newType = typeResponse.data;
   return newType;
};

export const updateTypeReq = async (type: IBasicCategory) => {
   await $authHost.put<IBasicCategory>('/type', type);
   return type;
};

export const deleteTypeByIdReq = async (id: number) => {
   const typeResponse = await $authHost.delete<IBasicCategory>('/type/' + id);
   const deleteId = typeResponse.data;
   return deleteId;
};
