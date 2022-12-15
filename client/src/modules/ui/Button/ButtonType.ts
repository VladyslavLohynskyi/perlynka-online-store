import { ReactNode } from 'react';

export interface ButtonPropsType {
   buttonClass: string;
   buttonText?: string;
   buttonClick?: () => void;
   additionalClass?: string;
   children?: ReactNode;
   width?: string;
}
