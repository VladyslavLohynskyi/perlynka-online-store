import React, { useState } from 'react';
import './AddAdminModal.scss';
import { AddAdminModalType } from './AddAdminModalType';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { Button } from '../../../../../ui/Button';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';

export const AddAdminModal: React.FC<AddAdminModalType> = ({
   onClose,
   nameValue,
   listOfValues,
   createValue,
}) => {
   const dispatch = useAppDispatch();

   const [value, setValue] = useState('');
   const [error, setError] = useState('');
   const handleSubmitName = async () => {
      const existValue = listOfValues?.find(
         (existValue) => existValue.name === value,
      );
      if (existValue) {
         setError(`${nameValue} з такою назвою вже існує`);
      } else {
         await dispatch(createValue(value));
      }
   };

   const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;
      const firstLetterOfNewBrand = newValue.charAt(0).toUpperCase();
      newValue = firstLetterOfNewBrand + newValue.slice(1);
      setValue(newValue);
   };

   return (
      <div className='add-admin-modal__container'>
         <ModalHeader text={`Створити ${nameValue}`} onClose={onClose} />
         <form
            className='add-admin-modal__main'
            onSubmit={(e) => {
               e.preventDefault();
               handleSubmitName();
            }}
         >
            <ModalInput
               text={'Назва'}
               value={value}
               placeholder={`Введіть назву ${nameValue}у`}
               onChange={handleChangeValue}
               required={true}
            />
            {error && <p className='modal__error'>{error}</p>}
            <Button
               buttonClass={ButtonClassEnum.PRIMARY}
               buttonText='Створити'
               width={'65%'}
               disabled={!value}
            />
         </form>
      </div>
   );
};
