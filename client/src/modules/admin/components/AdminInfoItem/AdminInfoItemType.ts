import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { IUser } from '../../../../store/reducers/user/UserSlice';

export interface AdminInfoItemType {
   admin: IUser;
   icon: IconDefinition;
   onClickButton: () => void;
}
