import React, { useState } from 'react';

import './AdminBasicPanelSection.scss';
import { AdminBasicPanelSectionType } from './AdminBasicPanelSectionType';
import { Button } from '../../../ui/Button';
import { Modal } from '../../../modal/pages';
import { AddAdminModal } from '../../../modal/components/HeaderDropdown/pages/AddAdminModal';
import { EditAdminModal } from '../../../modal/components/HeaderDropdown/pages/EditAdminModal';
import { DeleteAdminModal } from '../../../modal/components/HeaderDropdown/pages/DeleteAdminModal';

export const AdminBasicPanelSection: React.FC<AdminBasicPanelSectionType> = ({
   header,

   listOfValues,
   createValue,
   deleteValue,
   updateValue,
}) => {
   const [isAddModalOpened, setIsAddModalOpened] = useState(false);
   const [isEditModalOpened, setIsEditModalOpened] = useState(false);
   const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
   return (
      <>
         <div className='admin__panel'>
            <p className='admin__panel-title'>{header}</p>
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
            <AddAdminModal
               nameValue={header}
               onClose={() => setIsAddModalOpened(false)}
               listOfValues={listOfValues}
               createValue={createValue}
            />
         </Modal>
         <Modal
            isModalOpen={isEditModalOpened}
            onClose={() => setIsEditModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <EditAdminModal
               onClose={() => setIsEditModalOpened(false)}
               nameValue={header}
               listOfValues={listOfValues}
               updateValue={updateValue}
            />
         </Modal>
         <Modal
            isModalOpen={isDeleteModalOpened}
            onClose={() => setIsDeleteModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <DeleteAdminModal
               onClose={() => setIsDeleteModalOpened(false)}
               nameValue={header}
               deleteValue={deleteValue}
               listOfValues={listOfValues}
            />
         </Modal>
      </>
   );
};
