import {
   IShoes,
   ISizeCategory,
} from '../../../../store/reducers/shoes/ShoesSlice';

export interface BasketItemType {
   id: number;
   shoes: IShoes;
   count: number;
   size: ISizeCategory;
}
