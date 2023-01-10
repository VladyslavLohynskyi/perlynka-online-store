import { $host } from "."
import { IShoes } from "../store/reducers/shoes/ShoesSlice";

export const getShoesById = async (id:number) => {
        const response = await $host.get<IShoes>(`shoes/${id}`);
        const data = response.data
        return data  
}