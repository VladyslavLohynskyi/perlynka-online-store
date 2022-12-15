import React, { useState } from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './AddShoesModal.scss';
import { AddShoesModalType } from './AddShoesModalType';
import { BasicInput } from '../../../../../ui/BasicInput';
import { IconButton } from '../../../../../ui/IconButton';
import { useAppSelector } from '../../../../../../hooks/redux';

export const AddShoesModal: React.FC<AddShoesModalType> = ({ onClose }) => {
   const { brands, types, colors, seasons } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const [model, setModel] = useState('');
   const [price, setPrice] = useState(0);
   const [brand, setBrand] = useState<number>(0);
   const [type, setType] = useState<number>(0);
   const [color, setColor] = useState<number>(0);
   const [season, setSeason] = useState<number>(0);
   return (
      <div className='add-shoes-modal__container'>
         <div className='add-shoes-modal__header'>
            <h3>Додати нове взуття</h3>
            <IconButton icon={faClose} onClick={onClose} />
         </div>
         <form className='add-shoes-modal__main'>
            <div className='add-shoes-modal__label-container'>
               <label className='add-shoes-modal__label'>Модель</label>
               <BasicInput
                  value={model}
                  placeholder='Введіть назву моделі'
                  onChange={(e) => setModel(e.target.value)}
                  required={true}
               />
            </div>
            <div className='add-shoes-modal__label-container'>
               <label className='add-shoes-modal__label'>Ціна</label>
               <BasicInput
                  value={price}
                  placeholder='Введіть ціну'
                  type='number'
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required={true}
               />
            </div>
            <div className='add-shoes-modal__selects-container'>
               <select
                  className='add-shoes-modal__select'
                  name='brands'
                  onChange={(e) => setBrand(Number(e.target.value))}
                  value={brand}
               >
                  <option value={0} hidden disabled>
                     Вибрати бренд
                  </option>
                  {brands?.map((brand) => (
                     <option value={brand.id}>{brand.name}</option>
                  ))}
               </select>
               <select
                  className='add-shoes-modal__select'
                  name='types'
                  onChange={(e) => setType(Number(e.target.value))}
                  value={type}
               >
                  <option value={0} hidden disabled>
                     Вибрати тип
                  </option>
                  {types?.map((type) => (
                     <option value={type.id}>{type.name}</option>
                  ))}
               </select>
            </div>
            <div className='add-shoes-modal__selects-container'>
               <select
                  className='add-shoes-modal__select'
                  name='colors'
                  onChange={(e) => setColor(Number(e.target.value))}
                  value={color}
               >
                  <option value={0} hidden disabled>
                     Вибрати колір
                  </option>
                  {colors?.map((color) => (
                     <option value={color.id}>{color.name}</option>
                  ))}
               </select>
               <select
                  className='add-shoes-modal__select'
                  name='seasons'
                  onChange={(e) => setSeason(Number(e.target.value))}
                  value={season}
               >
                  <option value={0} hidden disabled>
                     Вибрати сезон
                  </option>
                  {seasons?.map((season) => (
                     <option value={season.id}>{season.name}</option>
                  ))}
               </select>
            </div>
         </form>
      </div>
   );
};
