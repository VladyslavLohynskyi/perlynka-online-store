import { IBasicCategory } from '../../../../store/reducers/shoes/ShoesSlice';

export interface FilterCheckboxListType {
   name: string;
   list: IBasicCategory[] | null;
   handleClickCheckbox: (id: number) => void;
   selectedValuesId: number[];
}
