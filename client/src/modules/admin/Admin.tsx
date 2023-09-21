import React, { useState } from 'react';
import { AddShoesModal } from '../modal/components/HeaderDropdown';
import { EditShoesModal } from '../modal/components/HeaderDropdown/pages/EditShoesModal';
import { Modal } from '../modal/pages';
import { Button } from '../ui/Button';
import './Admin.scss';

export const Admin: React.FC = () => {
   const [isAddShoesModalOpened, setIsAddShoesModalOpened] = useState(false);
   const [isEditShoesModalOpened, setIsEditShoesModalOpened] = useState(false);
   return (
      <>
         <main className='admin__main'>
            <div className='admin__container'>
               <div className='admin__shoes'>
                  <p className='admin__shoes-title'>Взуття</p>
                  <Button
                     buttonText='Додати'
                     buttonClass='primary'
                     buttonClick={() => setIsAddShoesModalOpened(true)}
                  />
                  <Button
                     buttonText='Редагувати'
                     buttonClass='secondary'
                     buttonClick={() => setIsEditShoesModalOpened(true)}
                  />
               </div>
            </div>
         </main>
         <Modal
            isModalOpen={isAddShoesModalOpened}
            onClose={() => setIsAddShoesModalOpened(false)}
            onBlur={true}
            modalPosition='shoes-modal-position'
         >
            <AddShoesModal onClose={() => setIsAddShoesModalOpened(false)} />
         </Modal>
         <Modal
            isModalOpen={isEditShoesModalOpened}
            onClose={() => setIsEditShoesModalOpened(false)}
            onBlur={true}
            modalPosition='shoes-modal-position'>
            <EditShoesModal onClose={() => setIsEditShoesModalOpened(false)}/>
         </Modal>
      </>
   );
};
