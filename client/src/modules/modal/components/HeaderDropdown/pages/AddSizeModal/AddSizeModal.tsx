import React, { useState } from 'react';
import './AddSizeModal.scss';
import { AddSizeModalType } from './AddSizeModalType';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { Button } from '../../../../../ui/Button';
import { createSize } from '../../../../../../store/reducers/shoes/SizeActionCreators';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';

export const AddSizeModal: React.FC<AddSizeModalType> = ({ onClose }) => {
   const { sizes } = useAppSelector((state) => state.shoesReducer);
   const dispatch = useAppDispatch();

   const [value, setValue] = useState<number>(0);
   const [error, setError] = useState('');
   const handleSubmitName = async () => {
      const existValue = sizes?.find(
         (existValue) => +existValue.size === value,
      );
      if (existValue) {
         setError(`Такий розмір вже існує`);
      } else {
         await dispatch(createSize(value));
      }
   };

   const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(+e.target.value);
   };

   return (
      <div className='add-admin-modal__container'>
         <ModalHeader text={`Створити Розмір`} onClose={onClose} />
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
               placeholder={`Введіть Розмір`}
               type='number'
               min={0}
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
