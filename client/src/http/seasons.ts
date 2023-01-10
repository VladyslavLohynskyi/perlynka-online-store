import { $host } from '.';
import { IBasicCategory } from '../store/reducers/shoes/ShoesSlice';

export const getAllSeasons = async () => {
   const seasonsResponse = await $host.get<IBasicCategory[]>('/season');
   const seasons = seasonsResponse.data;
   return seasons;
};
