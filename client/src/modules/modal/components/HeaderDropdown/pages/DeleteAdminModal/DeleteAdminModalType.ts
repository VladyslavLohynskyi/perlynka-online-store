import { IBasicCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';

export interface DeleteAdminModalType {
   onClose: () => void;
   nameValue: string;
   listOfValues: IBasicCategory[] | null;
   deleteValue: (id: number) => any;
}
