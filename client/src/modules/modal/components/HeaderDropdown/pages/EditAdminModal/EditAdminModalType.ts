import { IBasicCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';

export interface EditAdminModalType {
   onClose: () => void;
   nameValue: string;
   listOfValues: IBasicCategory[] | null;
   updateValue: (value: IBasicCategory) => any;
}
