import { ReactNode } from 'react';

export interface ModalType {
   isModalOpen: boolean;
   onClose: () => void;
   modalPosition?: string;
   topCoords?: number;
   onBlur?: boolean;
   children: ReactNode;
}
