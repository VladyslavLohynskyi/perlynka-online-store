import {
   IShoes,
   ISizeCategory,
} from '../../../../store/reducers/shoes/ShoesSlice';

export interface BasketItemType {
   id: string;
   shoes: IShoes;
   count: number;
   size: ISizeCategory;
}
