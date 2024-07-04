import './Alert.scss';
import React from 'react';
import { AlertType, AlertTypeEnum } from './AlertType';
import { IconButton } from '../IconButton';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Alert: React.FC<AlertType> = ({ show, onClose, type, message }) => {
   if (!show) {
      return null;
   }

   const timer = setTimeout(() => onClose(), 3000);
   function startTimer() {
      if (show) {
         return timer;
      }
   }
   startTimer();

   return (
      <div className='modal-alert__container' onClick={() => onClose()}>
         <div
            className={`modal-alert__content modal-alert--${type}`}
            onClick={(e) => {
               e.stopPropagation();
               clearTimeout(timer);
            }}
         >
            <h3>{message}</h3>
            {type === AlertTypeEnum.DANGER && (
               <p>Спробуйте перезавантажити сторінку і повторити дію ще раз</p>
            )}
            <IconButton icon={faClose} onClick={onClose} />
         </div>
      </div>
   );
};

export default Alert;
