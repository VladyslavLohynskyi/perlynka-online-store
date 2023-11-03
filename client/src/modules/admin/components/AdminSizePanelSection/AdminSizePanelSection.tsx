import React, { useState } from 'react';

import './AdminSizePanelSection.scss';

import { Button } from '../../../ui/Button';
import { Modal } from '../../../modal/pages';

import { AddSizeModal } from '../../../modal/components/HeaderDropdown/pages/AddSizeModal';
import { EditSizeModal } from '../../../modal/components/HeaderDropdown/pages/EditSizeModal/EditSizeModal';
import { DeleteSizeModal } from '../../../modal/components/HeaderDropdown/pages/DeleteSizeModal';

export const AdminSizePanelSection: React.FC = () => {
   const [isAddModalOpened, setIsAddModalOpened] = useState(false);
   const [isEditModalOpened, setIsEditModalOpened] = useState(false);
   const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
   return (
      <>
         <div className='admin__panel'>
            <p className='admin__panel-title'>Розмір</p>
            <Button
               buttonText='Додати'
               buttonClass='primary'
               buttonClick={() => setIsAddModalOpened(true)}
            />
            <Button
               buttonText='Редагувати'
               buttonClass='secondary'
               buttonClick={() => setIsEditModalOpened(true)}
            />
            <Button
               buttonText='Видалити'
               buttonClass='delete'
               buttonClick={() => setIsDeleteModalOpened(true)}
            />
         </div>
         <Modal
            isModalOpen={isAddModalOpened}
            onClose={() => setIsAddModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <AddSizeModal onClose={() => setIsAddModalOpened(false)} />
         </Modal>
         <Modal
            isModalOpen={isEditModalOpened}
            onClose={() => setIsEditModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <EditSizeModal onClose={() => setIsEditModalOpened(false)} />
         </Modal>
         <Modal
            isModalOpen={isDeleteModalOpened}
            onClose={() => setIsDeleteModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <DeleteSizeModal onClose={() => setIsDeleteModalOpened(false)} />
         </Modal>
      </>
   );
};
