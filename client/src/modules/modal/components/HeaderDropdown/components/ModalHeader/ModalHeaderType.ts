import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ModalHeaderType {
   text: string;
   onClose: () => void;
   icon?: IconDefinition;
}
