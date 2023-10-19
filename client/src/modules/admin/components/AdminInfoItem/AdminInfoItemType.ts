import { IUserRes } from '../../../../http/users';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface AdminInfoItemType {
   admin: IUserRes;
   icon: IconDefinition;
   onClickButton: () => void;
}
