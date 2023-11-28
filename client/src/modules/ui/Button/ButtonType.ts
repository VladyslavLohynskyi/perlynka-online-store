import { ReactNode } from 'react';
export enum ButtonClassEnum {
   PRIMARY = 'primary',
   SECONDARY = 'secondary',
   DISABLE = 'disable',
   DELETE = 'delete',
   PROFILE = 'profile',
   PAGINATION = 'pagination',
   ACTIVE_PAGINATION = 'active-pagination',
}
export interface ButtonPropsType {
   buttonClass: ButtonClassEnum;
   buttonText?: string;
   buttonClick?: () => void;
   additionalClass?: string;
   children?: ReactNode;
   width?: string;
   disabled?: boolean;
}
