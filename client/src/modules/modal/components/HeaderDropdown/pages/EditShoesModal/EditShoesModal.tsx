import React, { useEffect, useState } from 'react';
import { EditShoesModalType } from './EditShoesModalType';
import './EditShoesModal.scss';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { getShoesById } from '../../../../../../http/shoes';
import {
   IShoes,
   ISize,
   SexEnum,
} from '../../../../../../store/reducers/shoes/ShoesSlice';
import { baseURL } from '../../../../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { Button } from '../../../../../ui/Button';
import { SizeEditItem } from '../../components/SizeEditItem';
import { updateShoes } from '../../../../../../store/reducers/shoes/ShoesActionCreators';
import { ModalSearch } from '../../components/ModalSearch';

export const EditShoesModal: React.FC<EditShoesModalType> = ({ onClose }) => {
   const { brands, types, colors, seasons, sizes } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const { selectedBrandsId, selectedTypesId } = useAppSelector(
      (state) => state.filterReducer,
   );
   const dispatch = useAppDispatch();
   const [id, setId] = useState<number>(0);
   const [error, setError] = useState('');
   const [foundShoes, setFoundShoes] = useState<null | IShoes>(null);
   const [model, setModel] = useState('');
   const [price, setPrice] = useState(0);
   const [brand, setBrand] = useState(0);
   const [type, setType] = useState(0);
   const [color, setColor] = useState(0);
   const [season, setSeason] = useState(0);
   const [sex, setSex] = useState<string>('');
   const [addSizes, setAddSizes] = useState<ISize[]>([]);
   const [file, setFile] = useState<null | Blob>(null);
   useEffect(() => {
      if (foundShoes) {
         setModel(foundShoes.model);
         setPrice(foundShoes.price);
         setBrand(foundShoes.brandId);
         setType(foundShoes.typeId);
         setColor(foundShoes.colorId);
         setSeason(foundShoes.seasonId);
         setSex(foundShoes.sex);
         setAddSizes([]);
      }
   }, [foundShoes]);

   const handleChangeSize = (sizeId: number, count: number) => {
      if (count > 0) {
         if (addSizes.find((el) => el.sizeId === sizeId)) {
            setAddSizes((prev) =>
               prev.map((el) => (el.sizeId === sizeId ? { ...el, count } : el)),
            );
            return;
         } else {
            setAddSizes((prev) => [
               ...prev,
               { sizeId, count, shoId: Number(id) },
            ]);
            return;
         }
      }
      setAddSizes((prev) => prev.filter((el) => el.sizeId !== sizeId));
   };

   const handleSubmitId = async () => {
      setError('');
      setFoundShoes(null);
      getShoesById(id)
         .then((data) => setFoundShoes(data))
         .catch((e) => setError(e.response.data));
   };

   const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) setFile(e.target.files[0]);
   };

   const handleSubmitUpdate = (shoes: IShoes) => {
      const formData = new FormData();

      formData.append('id', String(id));
      if (model !== shoes.model) {
         formData.append('model', model);
      }
      if (price !== shoes.price) {
         formData.append('price', String(price));
      }
      if (brand !== shoes.brandId) {
         formData.append('brandId', String(brand));
      }
      if (type !== shoes.typeId) {
         formData.append('typeId', String(type));
      }
      if (color !== shoes.colorId) {
         formData.append('colorId', String(color));
      }
      if (season !== shoes.seasonId) {
         formData.append('seasonId', String(season));
      }
      if (sex !== shoes.sex) {
         formData.append('sex', String(sex));
      }
      if (
         JSON.stringify(addSizes) !==
         JSON.stringify(
            shoes.sizes.map(({ sizeId, count, shoId }) => {
               return { sizeId, count, shoId };
            }),
         )
      ) {
         formData.append('sizes', JSON.stringify(addSizes));
      }
      if (file) {
         formData.append('file', file);
      }
      dispatch(
         updateShoes(formData, {
            brandsId: selectedBrandsId,
            typesId: selectedTypesId,
         }),
      );
   };

   const handleChangeId = (newId: string) => {
      setId(Number(newId));
   };

   return (
      <div className='edit-shoes-modal__container'>
         <ModalHeader text='Редагувати Взуття' onClose={onClose} />
         <div className='edit-shoes-modal__main'>
            <ModalSearch
               value={id}
               setValue={handleChangeId}
               handleSubmitValue={handleSubmitId}
               type='number'
               text='Введіть ID'
               label='Індефікатор'
            />
            {error && <p className='modal__error'>{error}</p>}
            {foundShoes && (
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleSubmitUpdate(foundShoes);
                  }}
                  className='edit-shoes-modal__edit-form'
               >
                  <div className='edit-shoes-modal___main-edit-container'>
                     <img src={baseURL + foundShoes.img} alt='Взуття' />
                     <div>
                        <ModalInput
                           text='Фото'
                           onChange={handleChangeFile}
                           type='file'
                           required={false}
                        />
                        <ModalInput
                           text='Модель'
                           placeholder='Введіть назву моделі'
                           value={model}
                           onChange={(e) => setModel(e.target.value)}
                        />
                        <ModalInput
                           text='Ціна'
                           placeholder='Введіть Ціну'
                           value={price}
                           onChange={(e) => setPrice(Number(e.target.value))}
                           min={1}
                        />
                     </div>
                  </div>
                  <div className='edit-shoes-modal___secondary-edit-container'>
                     <select
                        className='add-shoes-modal__select'
                        name='brands'
                        onChange={(e) => setBrand(Number(e.target.value))}
                        value={brand}
                     >
                        <option value={0} hidden disabled>
                           Вибрати тип
                        </option>
                        {brands?.map((brand) => (
                           <option key={brand.id} value={brand.id}>
                              {brand.name}
                           </option>
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
                           <option key={type.id} value={type.id}>
                              {type.name}
                           </option>
                        ))}
                     </select>
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
                           <option key={color.id} value={color.id}>
                              {color.name}
                           </option>
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
                           <option key={season.id} value={season.id}>
                              {season.name}
                           </option>
                        ))}
                     </select>
                     <select
                        className='add-shoes-modal__select'
                        name='sex'
                        onChange={(e) => setSex(e.target.value)}
                        value={sex}
                     >
                        <option value={SexEnum.UNISEX}>{SexEnum.UNISEX}</option>
                        <option value={SexEnum.GIRL}>{SexEnum.GIRL}</option>
                        <option value={SexEnum.BOY}>{SexEnum.BOY}</option>
                     </select>
                  </div>
                  <div className='add-shoes-modal__sizes-container'>
                     {sizes?.map((size) => {
                        const value = foundShoes.sizes.find((el) => {
                           return el.sizeId === Number(size.id);
                        });

                        return (
                           <SizeEditItem
                              key={size.id}
                              onChangeSize={handleChangeSize}
                              size={size.size}
                              id={size.id}
                              value={value?.count}
                           />
                        );
                     })}
                  </div>
                  <div>
                     <Button
                        disabled={foundShoes ? false : true}
                        buttonClass='primary'
                        buttonText='Оновити'
                     />
                  </div>
               </form>
            )}
         </div>
      </div>
   );
};
