import React from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ModalHeaderType } from './ModalHeaderType';
import './ModalHeader.scss';
import { IconButton } from '../../../../../ui/IconButton';

export const ModalHeader: React.FC<ModalHeaderType> = ({
   text,
   onClose,
   icon,
}) => {
   return (
      <div className='modal-header'>
         <h3>{text}</h3>
         <IconButton icon={icon || faClose} onClick={onClose} />
      </div>
   );
};
