import React, { useState } from 'react';
import './AddShoesModal.scss';
import { AddShoesModalType } from './AddShoesModalType';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { SizeEditItem } from '../../components/SizeEditItem';
import { Button } from '../../../../../ui/Button';
import { createShoes } from '../../../../../../store/reducers/shoes/ShoesActionCreators';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { SexEnum } from '../../../../../../store/reducers/shoes/ShoesSlice';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';

import { IconButton } from '../../../../../ui/IconButton';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export interface IEditSize {
   sizeId: number;
   count: number;
}

export interface IShoesInfo {
   id: number;
   title: string;
   description: string;
}

export enum keyShoesInfoEnum {
   DESCRIPTION = 'description',
   TITLE = 'title',
}

interface IAdditionImages {
   id: number;
   img: null | Blob;
}

export const AddShoesModal: React.FC<AddShoesModalType> = ({ onClose }) => {
   const { brands, types, colors, seasons, sizes } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const {
      selectedBrandsId,
      selectedTypesId,
      selectedSeasonsId,
      selectedColorsId,
      selectedSex,
      selectedSizesId,
      selectedSortFilter,
      limit,
      page,
   } = useAppSelector((state) => state.filterReducer);
   const dispatch = useAppDispatch();
   const [model, setModel] = useState('');
   const [price, setPrice] = useState(0);
   const [brand, setBrand] = useState(0);
   const [type, setType] = useState(0);
   const [color, setColor] = useState(0);
   const [season, setSeason] = useState(0);
   const [mainPhoto, setMainPhoto] = useState<null | Blob>(null);
   const [sex, setSex] = useState<string>(SexEnum.UNISEX);
   const [addSizes, setAddSizes] = useState<IEditSize[]>([]);
   const [error, setError] = useState('');
   const [infos, setInfos] = useState<IShoesInfo[]>([]);
   const [additionImages, setAdditionImages] = useState<IAdditionImages[]>([
      { id: 1, img: null },
      { id: 2, img: null },
   ]);

   const handleChangeAdditionImage = (
      e: React.ChangeEvent<HTMLInputElement>,
      id: number,
   ) => {
      setAdditionImages((prev) =>
         prev.map((el) =>
            el.id === id ? { ...el, img: e.target.files![0] } : el,
         ),
      );
   };

   const addInfo = () => {
      setInfos((prev) => {
         return [...prev, { title: '', description: '', id: Date.now() }];
      });
   };

   const removeInfo = (id: number) => {
      setInfos((prev) => {
         return prev.filter((info) => info.id !== id);
      });
   };

   const changeInfo = (key: keyShoesInfoEnum, value: string, id: number) => {
      setInfos((prev) => {
         return prev.map((info) =>
            info.id === id
               ? {
                    ...info,
                    [key]: value,
                 }
               : info,
         );
      });
   };

   const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      if (!brand) {
         setError('Виберіть бренд');
         return;
      }
      if (!type) {
         setError('Виберіть тип');
         return;
      }
      if (!color) {
         setError('Виберіть колір');
         return;
      }
      if (!season) {
         setError('Виберіть сезон');
         return;
      }
      if (addSizes.length === 0) {
         setError('Виберіть кількість пар');
         return;
      }
      if (!mainPhoto || additionImages.length > 2) {
         setError('Виберіть фотографії (до 3 включно)');
         return;
      }

      if (
         infos.length > 0 &&
         infos.find((info) => !info.description || !info.title)
      ) {
         setError('Введіть додатковий опис до товару');
         return;
      }
      const formData = new FormData();
      formData.append('model', model);
      formData.append('price', String(price));
      formData.append('brandId', String(brand));
      formData.append('typeId', String(type));
      formData.append('colorId', String(color));
      formData.append('seasonId', String(season));
      formData.append('sizes', JSON.stringify(addSizes));
      formData.append('sex', String(sex));
      for (let i = 0; i < additionImages.length; i++) {
         if (additionImages[i].img) {
            formData.append('images', additionImages[i].img!);
         }
      }
      formData.append('images', mainPhoto);
      formData.append('shoesInfos', JSON.stringify(infos));
      dispatch(
         createShoes(formData, {
            brandsId: selectedBrandsId,
            typesId: selectedTypesId,
            seasonsId: selectedSeasonsId,
            colorsId: selectedColorsId,
            sex: selectedSex,
            sizesId: selectedSizesId,
            sortBy: selectedSortFilter,
            limit: limit,
            offset: limit * (page - 1),
         }),
      );
      onClose();
   };
   const handleChangeSize = (sizeId: number, count: number) => {
      if (count > 0) {
         if (addSizes.find((el) => el.sizeId === sizeId)) {
            setAddSizes((prev) =>
               prev.map((el) => (el.sizeId === sizeId ? { ...el, count } : el)),
            );
            return;
         } else {
            setAddSizes((prev) => [...prev, { sizeId, count }]);
            return;
         }
      }
      setAddSizes((prev) => prev.filter((el) => el.sizeId !== sizeId));
   };

   const handleChangeMainPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      if (e.target.files) {
         if (Array.from(e.target.files).length > 3) {
            setError('Забагато зображень, виберіть до 3 фотографій включно');
            return;
         }
         setMainPhoto(e.target.files[0]);
      }
   };
   return (
      <div className='add-shoes-modal__container modal-container'>
         <ModalHeader text='Додати нове взуття' onClose={onClose} />
         <form className='add-shoes-modal__main' onSubmit={handleSubmit}>
            <ModalInput
               text='Модель'
               value={model}
               placeholder='Введіть назву моделі'
               onChange={(e) => setModel(e.target.value)}
               required={true}
            />
            <ModalInput
               text='Ціна'
               value={price}
               placeholder='Введіть ціну'
               type='number'
               onChange={(e) => setPrice(Number(e.target.value))}
               required={true}
            />
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
            </div>
            <div className='add-shoes-modal__selects-container'>
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
            <div className='add-shoes-modal__add-images-container'>
               <div className='add-shoes-modal__add-img-container'>
                  <div className='add-shoes-modal__img-container'>
                     <img
                        src={
                           mainPhoto
                              ? URL.createObjectURL(mainPhoto)
                              : '/images/Noimg.webp'
                        }
                        alt='Взуття'
                     />
                  </div>
                  <ModalInput
                     text='Головне Фото'
                     onChange={handleChangeMainPhoto}
                     type='file'
                     required={false}
                     accept='image/*'
                  />
               </div>
               {additionImages.map(({ id, img }) => (
                  <div
                     key={id}
                     className='edit-shoes-modal__edit-img-container'
                  >
                     <div className='edit-shoes-modal__img-container'>
                        <img
                           src={
                              img
                                 ? URL.createObjectURL(img)
                                 : '/images/Noimg.webp'
                           }
                           alt='Взуття'
                        />
                     </div>
                     <ModalInput
                        text='Фото'
                        onChange={(e) => handleChangeAdditionImage(e, id)}
                        type='file'
                        required={false}
                        accept='image/*'
                     />
                  </div>
               ))}
            </div>
            <div className='add-shoes-modal__sizes-container'>
               {sizes?.map((size) => (
                  <SizeEditItem
                     key={size.id}
                     onChangeSize={handleChangeSize}
                     size={size.size}
                     id={size.id}
                  />
               ))}
            </div>
            <div>
               <Button
                  buttonClass={ButtonClassEnum.SECONDARY}
                  buttonText='Додати додатковий опис товару'
                  onClick={(e) => {
                     e.preventDefault();
                     addInfo();
                  }}
               />
               {infos.map((info) => (
                  <div
                     className='add-shoes-modal__info-container'
                     key={info.id}
                  >
                     <ModalInput
                        text='Заголовок'
                        onChange={(e) =>
                           changeInfo(
                              keyShoesInfoEnum.TITLE,
                              e.target.value,
                              info.id,
                           )
                        }
                        type='text'
                        required={true}
                     />
                     <ModalInput
                        text='Oпис'
                        onChange={(e) =>
                           changeInfo(
                              keyShoesInfoEnum.DESCRIPTION,
                              e.target.value,
                              info.id,
                           )
                        }
                        type='text'
                        required={true}
                     />
                     <div className='add-shoes-modal__info-container__trash-button-container'>
                        <IconButton
                           icon={faTrash}
                           onClick={() => removeInfo(info.id)}
                        />
                     </div>
                  </div>
               ))}
            </div>
            {error && <p className='modal__error'>{error}</p>}
            <div>
               <Button
                  buttonClass={ButtonClassEnum.PRIMARY}
                  buttonText='Додати'
               />
            </div>
         </form>
      </div>
   );
};
