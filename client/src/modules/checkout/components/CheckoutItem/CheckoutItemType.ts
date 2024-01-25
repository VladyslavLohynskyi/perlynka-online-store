import {
   IShoes,
   ISizeCategory,
} from '../../../../store/reducers/shoes/ShoesSlice';

export interface CheckoutItemType {
   id: string;
   shoes: IShoes;
   count: number;
   size: ISizeCategory;
}
