import React, { useState } from 'react';
import './DeleteBrandModal.scss';
import { DeleteBrandModalType } from './DeleteBrandModalType';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';

import { Button } from '../../../../../ui/Button';
import { deleteBrand } from '../../../../../../store/reducers/shoes/BrandsActionCreatores';
import { ModalSearch } from '../../components/ModalSearch';
import { IBasicCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';

export const DeleteBrandModal: React.FC<DeleteBrandModalType> = ({
   onClose,
}) => {
   const { brands } = useAppSelector((state) => state.shoesReducer);
   const dispatch = useAppDispatch();
   const [name, setName] = useState('');
   const [brand, setBrand] = useState<IBasicCategory | null>(null);
   const [error, setError] = useState('');

   const handleSubmitName = (enteredName: string) => {
      setError('');
      const existBrand = brands?.find(
         (existBrand) => existBrand.name === enteredName,
      );

      if (!existBrand) {
         setError('Бренд з такою назвою не існує');
      } else {
         setName('');
         setBrand(existBrand);
      }
   };

   const handleChangeSearchName = (value: string) => {
      let newName = value;
      const firstLetterOfNewBrand = newName.charAt(0).toUpperCase();
      newName = firstLetterOfNewBrand + newName.slice(1);
      setName(newName);
   };

   const handleDeleteBrand = () => {
      dispatch(deleteBrand(+brand!.id));
   };

   return (
      <div className='delete-brand-modal__container'>
         <ModalHeader text='Видалити Бренд' onClose={onClose} />
         <div className='delete-brand-modal__main'>
            <ModalSearch
               handleSubmitValue={() => handleSubmitName(name)}
               value={name}
               type='string'
               label='Назва'
               setValue={handleChangeSearchName}
               text='Введіть назву бренду'
            />
            {error && <p className='modal__error'>{error}</p>}
            {brand && (
               <>
                  <div className='delete-brand-modal__info'>
                     <p>ID : {brand.id}</p>
                     <p>Назва : {brand.name}</p>
                  </div>
                  <Button
                     additionalClass='admin-modal-accept-btn'
                     buttonClass='delete'
                     buttonText='Видалити'
                     buttonClick={handleDeleteBrand}
                  />
               </>
            )}
         </div>
      </div>
   );
};
