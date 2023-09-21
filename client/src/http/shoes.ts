import { $host, $authHost } from '.';
import { IShoes } from '../store/reducers/shoes/ShoesSlice';

export const getAllShoes = async () => {
   const responseShoes = await $host.get<IShoes[]>('/shoes');
   const shoes = responseShoes.data;
   return shoes;
};

export const getShoesById = async (id: number) => {
   const responseShoes = await $host.get<IShoes>(`shoes/${id}`);
   const shoes = responseShoes.data;
   return shoes;
};

export const createShoesReq = (shoesData: FormData) =>
   $authHost.post('/shoes', shoesData);

export const updateShoesReq = (shoesData: FormData) =>
   $authHost.put('/shoes', shoesData);
