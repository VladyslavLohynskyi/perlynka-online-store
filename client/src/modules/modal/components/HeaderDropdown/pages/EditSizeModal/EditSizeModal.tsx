import React, { useState } from 'react';
import './EditSizeModal.scss';
import { EditSizeModalType } from './EditSizeModalType';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { Button } from '../../../../../ui/Button';
import { ModalSearch } from '../../components/ModalSearch';
import { ISizeCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';
import { updateSize } from '../../../../../../store/reducers/shoes/SizeActionCreators';

export const EditSizeModal: React.FC<EditSizeModalType> = ({ onClose }) => {
   const { sizes } = useAppSelector((state) => state.shoesReducer);
   const dispatch = useAppDispatch();
   const [name, setName] = useState(0);
   const [value, setValue] = useState<ISizeCategory | null>(null);
   const [error, setError] = useState('');
   const [disable, setDisable] = useState(true);

   const handleSubmitSize = (enteredSize: number) => {
      setError('');
      const existSize = sizes?.find((size) => +size.size === enteredSize);

      if (!existSize) {
         setError(`${enteredSize} розміра не існує`);
      } else {
         setName(0);
         setValue(existSize);
      }
   };

   const handleChangeSize = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue({ ...value!, size: e.target.value });
      const existValue = sizes!.find(
         (existValue) => existValue.size === e.target.value,
      );
      if (existValue) {
         setDisable(true);
      } else setDisable(false);
   };

   const handleChangeSearchSize = (name: string) => {
      setName(+name);
   };

   const handleUpdateName = () => {
      dispatch(updateSize(value!));
   };

   return (
      <div className='edit-admin-modal__container'>
         <ModalHeader text={'Редагувати Розмір'} onClose={onClose} />
         <div className='edit-admin-modal__main'>
            <ModalSearch
               handleSubmitValue={() => handleSubmitSize(+name)}
               value={name}
               type='number'
               label='Назва'
               setValue={handleChangeSearchSize}
               text={`Введіть розмір`}
            />
            {error && <p className='modal__error'>{error}</p>}
            {value && (
               <>
                  <ModalInput
                     text={`Введіть зміненний розмір`}
                     value={value.size}
                     type='number'
                     onChange={handleChangeSize}
                  />
                  <Button
                     additionalClass='admin-modal-accept-btn'
                     buttonClass='secondary'
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
