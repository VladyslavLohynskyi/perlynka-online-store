import React, { useState } from 'react';
import './AddBrandModal.scss';
import { AddBrandModalType } from './AddBrandModalType';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { Button } from '../../../../../ui/Button';

export const AddBrandModal: React.FC<AddBrandModalType> = ({ onClose }) => {
   const { brands } = useAppSelector((state) => state.shoesReducer);
   const dispatch = useAppDispatch();

   const [brand, setBrand] = useState('');
   const [error, setError] = useState('');
   const handleSubmitName = () => {
      const existBrand = brands?.find(
         (existBrand) => existBrand.name === brand,
      );
      if (existBrand) {
         setError('Бренд з такою назвою вже існує');
      }
   };

   const handleChangeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newBrand = e.target.value;
      const firstLetterOfNewBrand = newBrand.charAt(0).toUpperCase();
      newBrand = firstLetterOfNewBrand + newBrand.slice(1);
      setBrand(newBrand);
   };

   return (
      <div className='add-brand-modal__container'>
         <ModalHeader text='Створити Бренд' onClose={onClose} />
         <form
            className='add-brand-modal__main'
            onSubmit={(e) => {
               e.preventDefault();
               handleSubmitName();
            }}
         >
            <ModalInput
               text={'Назва'}
               value={brand}
               placeholder='Введіть назву бренду'
               onChange={handleChangeBrand}
               required={true}
            />
            {error && <p className='modal__error'>{error}</p>}
            <Button
               buttonClass='primary'
               buttonText='Створити'
               width={'65%'}
               disabled={!brand}
            />
         </form>
      </div>
   );
};
