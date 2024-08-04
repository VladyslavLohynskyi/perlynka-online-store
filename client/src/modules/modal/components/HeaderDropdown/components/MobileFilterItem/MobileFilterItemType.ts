import { NameOfCategoriesEnum } from '../../../../../shop/pages';

export interface MobileFilterItemType {
   text: NameOfCategoriesEnum;
   onClick: () => void;
}
