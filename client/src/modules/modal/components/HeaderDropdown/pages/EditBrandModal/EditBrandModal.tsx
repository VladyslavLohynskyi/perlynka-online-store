import React, { useState } from 'react';
import './EditBrandModal.scss';
import { EditBrandModalType } from './EditBrandModalType';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { Button } from '../../../../../ui/Button';
import { updateBrand } from '../../../../../../store/reducers/shoes/BrandsActionCreatores';
import { ModalSearch } from '../../components/ModalSearch';
import { IBasicCategory } from '../../../../../../store/reducers/shoes/ShoesSlice';

export const EditBrandModal: React.FC<EditBrandModalType> = ({ onClose }) => {
   const { brands } = useAppSelector((state) => state.shoesReducer);
   const dispatch = useAppDispatch();
   const [name, setName] = useState('');
   const [brand, setBrand] = useState<IBasicCategory | null>(null);
   const [error, setError] = useState('');
   const [disable, setDisable] = useState(true);

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

   const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newName = e.target.value;
      const firstLetterOfNewBrand = newName.charAt(0).toUpperCase();
      newName = firstLetterOfNewBrand + newName.slice(1);
      setBrand({ ...brand!, name: newName });
      const existBrand = brands?.find(
         (existBrand) => existBrand.name === newName,
      );
      if (existBrand) {
         setDisable(true);
      } else setDisable(false);
   };

   const handleChangeSearchName = (value: string) => {
      let newName = value;
      const firstLetterOfNewBrand = newName.charAt(0).toUpperCase();
      newName = firstLetterOfNewBrand + newName.slice(1);
      setName(newName);
   };

   const handleUpdateName = () => {
      dispatch(updateBrand(brand!));
   };

   return (
      <div className='edit-brand-modal__container'>
         <ModalHeader text='Редагувати Бренд' onClose={onClose} />
         <div className='edit-brand-modal__main'>
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
                  <ModalInput
                     text='Введіть нову назву бренду'
                     value={brand.name}
                     onChange={handleChangeName}
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