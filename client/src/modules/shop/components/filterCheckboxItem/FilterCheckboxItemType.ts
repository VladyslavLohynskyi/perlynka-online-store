import { IBasicCategory } from '../../../../store/reducers/shoes/ShoesSlice';

export interface FilterCheckboxItemType {
   handleClickCheckbox: (id: number) => void;
   selectedValuesId: number[];
   name: string;
   id: string;
}
