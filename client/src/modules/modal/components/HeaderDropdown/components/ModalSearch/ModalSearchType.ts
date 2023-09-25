import { Dispatch } from '@reduxjs/toolkit';

export interface ModalSearchType {
   handleSubmitValue: () => void;
   value: number | string;
   setValue: (value: string) => void;
   text: string;
   type: 'string' | 'number';
}
