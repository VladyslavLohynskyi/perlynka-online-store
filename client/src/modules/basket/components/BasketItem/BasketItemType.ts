import {
   IShoes,
   ISizeCategory,
} from '../../../../store/reducers/shoes/ShoesSlice';

export interface BasketItemType {
   shoes: IShoes;
   count: number;
   size: ISizeCategory;
}
