import React, { useState } from 'react';
import { AddShoesModal } from '../modal/components/HeaderDropdown';
import { EditShoesModal } from '../modal/components/HeaderDropdown/pages/EditShoesModal';
import { Modal } from '../modal/pages';
import { Button } from '../ui/Button';
import './Admin.scss';
import { DeleteShoesModal } from '../modal/components/HeaderDropdown/pages/DeleteShoesModal';

export const Admin: React.FC = () => {
   const [isAddShoesModalOpened, setIsAddShoesModalOpened] = useState(false);
   const [isEditShoesModalOpened, setIsEditShoesModalOpened] = useState(false);
   const [isDeleteShoesModalOpened, setIsDeleteShoesModalOpened] =
      useState(false);

   const [isAddBrandModalOpened, setIsAddBrandModalOpened] = useState(false);
   const [isEditBrandModalOpened, setIsEditBrandModalOpened] = useState(false);
   const [isDeleteBrandModalOpened, setIsDeleteBrandModalOpened] =
      useState(false);
   return (
      <>
         <main className='admin__main'>
            <div className='admin__container'>
               <div className='admin__panel'>
                  <p className='admin__panel-title'>Взуття</p>
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
                  <Button
                     buttonText='Видалити'
                     buttonClass='delete'
                     buttonClick={() => setIsDeleteShoesModalOpened(true)}
                  />
               </div>
               <div className='admin__panel'>
                  <p className='admin__panel-title'>Бренд</p>
                  <Button
                     buttonText='Додати'
                     buttonClass='primary'
                     buttonClick={() => setIsAddBrandModalOpened(true)}
                  />
                  <Button
                     buttonText='Редагувати'
                     buttonClass='secondary'
                     buttonClick={() => setIsEditBrandModalOpened(true)}
                  />
                  <Button
                     buttonText='Видалити'
                     buttonClass='delete'
                     buttonClick={() => setIsDeleteBrandModalOpened(true)}
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
            modalPosition='shoes-modal-position'
         >
            <EditShoesModal onClose={() => setIsEditShoesModalOpened(false)} />
         </Modal>
         <Modal
            isModalOpen={isDeleteShoesModalOpened}
            onClose={() => setIsDeleteShoesModalOpened(false)}
            onBlur={true}
            modalPosition='shoes-modal-position'
         >
            <DeleteShoesModal
               onClose={() => setIsDeleteShoesModalOpened(false)}
            />
         </Modal>
      </>
   );
};
