import React, { useState } from 'react';

import './AdminShoesPanelSection.scss';
import { AdminShoesPanelSectionType } from './AdminShoesPanelSectionType';
import { Button } from '../../../ui/Button';
import { Modal } from '../../../modal/pages';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';

export const AdminShoesPanelSection: React.FC<AdminShoesPanelSectionType> = ({
   AddModalComponent,
   EditModalComponent,
   DeleteModalComponent,
}) => {
   const [isAddModalOpened, setIsAddModalOpened] = useState(false);
   const [isEditModalOpened, setIsEditModalOpened] = useState(false);
   const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
   return (
      <>
         <div className='admin__panel'>
            <p className='admin__panel-title'>Взуття</p>
            <Button
               buttonText='Додати'
               buttonClass={ButtonClassEnum.PRIMARY}
               buttonClick={() => setIsAddModalOpened(true)}
            />
            <Button
               buttonText='Редагувати'
               buttonClass={ButtonClassEnum.SECONDARY}
               buttonClick={() => setIsEditModalOpened(true)}
            />
            <Button
               buttonText='Видалити'
               buttonClass={ButtonClassEnum.DELETE}
               buttonClick={() => setIsDeleteModalOpened(true)}
            />
         </div>
         <Modal
            isModalOpen={isAddModalOpened}
            onClose={() => setIsAddModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <AddModalComponent onClose={() => setIsAddModalOpened(false)} />
         </Modal>
         <Modal
            isModalOpen={isEditModalOpened}
            onClose={() => setIsEditModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <EditModalComponent onClose={() => setIsEditModalOpened(false)} />
         </Modal>
         <Modal
            isModalOpen={isDeleteModalOpened}
            onClose={() => setIsDeleteModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <DeleteModalComponent
               onClose={() => setIsDeleteModalOpened(false)}
            />
         </Modal>
      </>
   );
};
