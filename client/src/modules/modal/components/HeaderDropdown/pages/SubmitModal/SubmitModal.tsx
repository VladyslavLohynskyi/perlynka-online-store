import React from 'react';
import './SubmitModal.scss';

import { SubmitModalType } from './SubmitModalType';
import { Button } from '../../../../../ui/Button';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';

export const SubmitModal: React.FC<SubmitModalType> = ({
   onClose,
   onSubmit,
   text,
}) => {
   return (
      <div className='submit-modal__container modal-container'>
         <h4>{text}</h4>
         <div className='submit-modal__buttons-container'>
            <Button
               onClick={onSubmit}
               buttonText='Підтвердити'
               buttonClass={ButtonClassEnum.BUY}
            />
            <Button
               onClick={onClose}
               buttonText='Скасувати'
               buttonClass={ButtonClassEnum.COMMUNICATION}
            />
         </div>
      </div>
   );
};
