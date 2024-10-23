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
            <div>
               <h3 className='nav-btn-text'>{message}</h3>
               {type === AlertTypeEnum.DANGER && (
                  <p className='modal-alert__description'>
                     Примітка: Спробуйте перезавантажити сторінку і повторити
                     дію ще раз
                  </p>
               )}
            </div>
            <IconButton icon={faClose} onClick={onClose} />
         </div>
      </div>
   );
};

export default Alert;
