import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ModalType } from './ModalType';
import './Modal.scss';

const modalRootElement: HTMLElement | null = document.querySelector('#modal');

export const Modal: React.FC<ModalType> = ({
   children,
   isModalOpen,
   onClose,
   modalPosition,
   topCoords,
   onBlur,
}) => {
   const element = useMemo<HTMLDivElement>(
      () => document.createElement('div'),
      [],
   );

   useEffect(() => {
      if (isModalOpen) {
         modalRootElement?.appendChild(element);

         return () => {
            modalRootElement?.removeChild(element);
         };
      }
   });
   if (isModalOpen) {
      return createPortal(
         <div className={onBlur ? 'onBlur' : ''}>
            <div className='modal' onClick={onClose}>
               <div
                  className={`modal__content ${modalPosition}`}
                  style={{
                     top: `${topCoords}px`,
                  }}
                  onClick={(e) => e.stopPropagation()}
               >
                  {children}
               </div>
            </div>
         </div>,
         element,
      );
   }

   return null;
};
