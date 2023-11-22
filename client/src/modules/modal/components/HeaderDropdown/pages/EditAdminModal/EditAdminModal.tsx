import React, { useState } from 'react';
import './EditAdminModal.scss';
import { EditAdminModalType } from './EditAdminModalType';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { Button } from '../../../../../ui/Button';
import { ModalSearch } from '../../components/ModalSearch';
import { IBasicCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';

export const EditAdminModal: React.FC<EditAdminModalType> = ({
   onClose,
   nameValue,
   listOfValues,
   updateValue,
}) => {
   const dispatch = useAppDispatch();
   const [name, setName] = useState('');
   const [value, setValue] = useState<IBasicCategory | null>(null);
   const [error, setError] = useState('');
   const [disable, setDisable] = useState(true);

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

   const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newName = e.target.value;
      const firstLetterOfNewValue = newName.charAt(0).toUpperCase();
      newName = firstLetterOfNewValue + newName.slice(1);
      setValue({ ...value!, name: newName });
      const existValue = listOfValues?.find(
         (existValue) => existValue.name === newName,
      );
      if (existValue) {
         setDisable(true);
      } else setDisable(false);
   };

   const handleChangeSearchName = (text: string) => {
      let newName = text;
      const firstLetterOfNewValue = newName.charAt(0).toUpperCase();
      newName = firstLetterOfNewValue + newName.slice(1);
      setName(newName);
   };

   const handleUpdateName = () => {
      dispatch(updateValue(value!));
   };

   return (
      <div className='edit-admin-modal__container'>
         <ModalHeader text={'Редагувати' + nameValue} onClose={onClose} />
         <div className='edit-admin-modal__main'>
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
                  <ModalInput
                     text={`Введіть нову назву ${nameValue}у`}
                     value={value.name}
                     onChange={handleChangeName}
                  />
                  <Button
                     additionalClass='admin-modal-accept-btn'
                     buttonClass={ButtonClassEnum.SECONDARY}
                     buttonText='Редагувати'
                     disabled={disable}
                     buttonClick={handleUpdateName}
                  />
               </>
            )}
         </div>
      </div>
   );
};
