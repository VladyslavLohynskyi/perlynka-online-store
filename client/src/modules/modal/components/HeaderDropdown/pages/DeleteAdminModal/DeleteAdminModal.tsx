import React, { useState } from 'react';
import './DeleteAdminModal.scss';
import { DeleteAdminModalType } from './DeleteAdminModalType';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';
import { Button } from '../../../../../ui/Button';
import { ModalSearch } from '../../components/ModalSearch';
import { IBasicCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';

export const DeleteAdminModal: React.FC<DeleteAdminModalType> = ({
   onClose,
   nameValue,
   listOfValues,
   deleteValue,
}) => {
   const dispatch = useAppDispatch();
   const [name, setName] = useState('');
   const [value, setValue] = useState<IBasicCategory | null>(null);
   const [error, setError] = useState('');

   const handleSubmitName = (enteredName: string) => {
      setError('');
      const existValue = listOfValues?.find(
         (existValue) => existValue.name === enteredName,
      );

      if (!existValue) {
         setError(`${nameValue} з такою назвою не існує`);
      } else {
         setName('');
         setValue(existValue);
      }
   };

   const handleChangeSearchName = (text: string) => {
      let newName = text;
      const firstLetterOfNewBrand = newName.charAt(0).toUpperCase();
      newName = firstLetterOfNewBrand + newName.slice(1);
      setName(newName);
   };

   const handleDeleteValue = () => {
      dispatch(deleteValue(+value!.id));
   };

   return (
      <div className='delete-admin-modal__container'>
         <ModalHeader text={'Видалити ' + nameValue} onClose={onClose} />
         <div className='delete-admin-modal__main'>
            <ModalSearch
               handleSubmitValue={() => handleSubmitName(name)}
               value={name}
               type='string'
               label='Назва'
               setValue={handleChangeSearchName}
               text={`Введіть назву ${nameValue}у`}
            />
            {error && <p className='modal__error'>{error}</p>}
            {value && (
               <>
                  <div className='delete-admin-modal__info'>
                     <p>ID : {value.id}</p>
                     <p>Назва : {value.name}</p>
                  </div>
                  <Button
                     additionalClass='admin-modal-accept-btn'
                     buttonClass={ButtonClassEnum.DELETE}
                     buttonText='Видалити'
                     buttonClick={handleDeleteValue}
                  />
               </>
            )}
         </div>
      </div>
   );
};
