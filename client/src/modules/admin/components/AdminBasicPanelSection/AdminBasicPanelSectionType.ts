import { IBasicCategory } from '../../../../store/reducers/shoes/ShoesSlice';

export interface AdminBasicPanelSectionType {
   header: string;
   listOfValues: IBasicCategory[] | null;
   createValue: (value: string) => any;
   deleteValue: (id: number) => any;
   updateValue: (value: IBasicCategory) => any;
}
