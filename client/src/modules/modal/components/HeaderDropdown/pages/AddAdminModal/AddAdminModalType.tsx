import { IBasicCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';

export interface AddAdminModalType {
   onClose: () => void;
   nameValue: string;
   listOfValues: IBasicCategory[] | null;
   createValue: (value: string) => any;
}
