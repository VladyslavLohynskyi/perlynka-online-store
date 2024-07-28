import React, { useState } from 'react';
import './DeleteSizeModal.scss';
import { DeleteSizeModalType } from './DeleteSizeModalType';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';
import { Button } from '../../../../../ui/Button';
import { ModalSearch } from '../../components/ModalSearch';
import { ISizeCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';
import { deleteSize } from '../../../../../../store/reducers/shoes/SizeActionCreators';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';

export const DeleteSizeModal: React.FC<DeleteSizeModalType> = ({ onClose }) => {
   const { sizes } = useAppSelector((state) => state.shoesReducer);
   const dispatch = useAppDispatch();
   const [name, setName] = useState('');
   const [value, setValue] = useState<ISizeCategory | null>(null);
   const [error, setError] = useState('');

   const handleSubmitName = (enteredName: string) => {
      setError('');
      const existValue = sizes?.find(
         (existValue) => +existValue.size === +enteredName,
      );

      if (!existValue) {
         setError(`${enteredName} розміру не існує`);
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
      dispatch(deleteSize(+value!.id));
   };

   return (
      <div className='delete-admin-modal__container  modal-container'>
         <ModalHeader text='Видалити розмір' onClose={onClose} />
         <div className='delete-admin-modal__main'>
            <ModalSearch
               handleSubmitValue={() => handleSubmitName(name)}
               value={name}
               type='string'
               label='Назва'
               setValue={handleChangeSearchName}
               text='Введіть розмір'
            />
            {error && <p className='modal__error'>{error}</p>}
            {value && (
               <>
                  <div className='delete-admin-modal__info'>
                     <p>ID : {value.id}</p>
                     <p>Назва : {value.size}</p>
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
