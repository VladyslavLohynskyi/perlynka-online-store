import React, { useState } from 'react';
import { AddShoesModal } from '../modal/components/HeaderDropdown';
import { EditShoesModal } from '../modal/components/HeaderDropdown/pages/EditShoesModal';
import { Modal } from '../modal/pages';
import { Button } from '../ui/Button';
import './Admin.scss';
import { DeleteShoesModal } from '../modal/components/HeaderDropdown/pages/DeleteShoesModal';
import { AddAdminModal } from '../modal/components/HeaderDropdown/pages/AddAdminModal';
import { useAppSelector } from '../../hooks/redux';
import {
   createBrand,
   deleteBrand,
   updateBrand,
} from '../../store/reducers/shoes/BrandsActionCreatores';
import { EditAdminModal } from '../modal/components/HeaderDropdown/pages/EditAdminModal';
import { DeleteAdminModal } from '../modal/components/HeaderDropdown/pages/DeleteAdminModal';
import {
   createType,
   deleteType,
   updateType,
} from '../../store/reducers/shoes/TypesActionCreators';

export const Admin: React.FC = () => {
   const { brands, types } = useAppSelector((state) => state.shoesReducer);
   const [isAddShoesModalOpened, setIsAddShoesModalOpened] = useState(false);
   const [isEditShoesModalOpened, setIsEditShoesModalOpened] = useState(false);
   const [isDeleteShoesModalOpened, setIsDeleteShoesModalOpened] =
      useState(false);

   const [isAddBrandModalOpened, setIsAddBrandModalOpened] = useState(false);
   const [isEditBrandModalOpened, setIsEditBrandModalOpened] = useState(false);
   const [isDeleteBrandModalOpened, setIsDeleteBrandModalOpened] =
      useState(false);

   const [isAddTypeModalOpened, setIsAddTypeModalOpened] = useState(false);
   const [isEditTypeModalOpened, setIsEditTypeModalOpened] = useState(false);
   const [isDeleteTypeModalOpened, setIsDeleteTypeModalOpened] =
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
               <div className='admin__panel'>
                  <p className='admin__panel-title'>Тип</p>
                  <Button
                     buttonText='Додати'
                     buttonClass='primary'
                     buttonClick={() => setIsAddTypeModalOpened(true)}
                  />
                  <Button
                     buttonText='Редагувати'
                     buttonClass='secondary'
                     buttonClick={() => setIsEditTypeModalOpened(true)}
                  />
                  <Button
                     buttonText='Видалити'
                     buttonClass='delete'
                     buttonClick={() => setIsDeleteTypeModalOpened(true)}
                  />
               </div>
            </div>
         </main>
         <Modal
            isModalOpen={isAddShoesModalOpened}
            onClose={() => setIsAddShoesModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <AddShoesModal onClose={() => setIsAddShoesModalOpened(false)} />
         </Modal>
         <Modal
            isModalOpen={isEditShoesModalOpened}
            onClose={() => setIsEditShoesModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <EditShoesModal onClose={() => setIsEditShoesModalOpened(false)} />
         </Modal>
         <Modal
            isModalOpen={isDeleteShoesModalOpened}
            onClose={() => setIsDeleteShoesModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <DeleteShoesModal
               onClose={() => setIsDeleteShoesModalOpened(false)}
            />
         </Modal>
         <Modal
            isModalOpen={isAddBrandModalOpened}
            onClose={() => setIsAddBrandModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <AddAdminModal
               nameValue='Бренд'
               onClose={() => setIsAddBrandModalOpened(false)}
               listOfValues={brands}
               createValue={createBrand}
            />
         </Modal>
         <Modal
            isModalOpen={isEditBrandModalOpened}
            onClose={() => setIsEditBrandModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <EditAdminModal
               nameValue='Бренд'
               onClose={() => setIsEditBrandModalOpened(false)}
               listOfValues={brands}
               updateValue={updateBrand}
            />
         </Modal>
         <Modal
            isModalOpen={isDeleteBrandModalOpened}
            onClose={() => setIsDeleteBrandModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <DeleteAdminModal
               nameValue='Бренд'
               onClose={() => setIsDeleteBrandModalOpened(false)}
               listOfValues={brands}
               deleteValue={deleteBrand}
            />
         </Modal>

         <Modal
            isModalOpen={isAddTypeModalOpened}
            onClose={() => setIsAddTypeModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <AddAdminModal
               nameValue='Тип'
               onClose={() => setIsAddTypeModalOpened(false)}
               listOfValues={types}
               createValue={createType}
            />
         </Modal>

         <Modal
            isModalOpen={isEditTypeModalOpened}
            onClose={() => setIsEditTypeModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <EditAdminModal
               nameValue='Тип'
               onClose={() => setIsEditTypeModalOpened(false)}
               listOfValues={types}
               updateValue={updateType}
            />
         </Modal>
         <Modal
            isModalOpen={isDeleteTypeModalOpened}
            onClose={() => setIsDeleteTypeModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <DeleteAdminModal
               nameValue='Тип'
               onClose={() => setIsDeleteTypeModalOpened(false)}
               listOfValues={types}
               deleteValue={deleteType}
            />
         </Modal>
      </>
   );
};
