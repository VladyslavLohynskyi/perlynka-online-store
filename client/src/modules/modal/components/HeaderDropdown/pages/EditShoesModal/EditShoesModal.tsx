import React, { useEffect, useState } from 'react';
import { EditShoesModalType } from './EditShoesModalType';
import './EditShoesModal.scss';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import shoesReq, {
   IParticularShoes,
   IShoesImage,
} from '../../../../../../http/shoes';
import {
   ISize,
   SexEnum,
} from '../../../../../../store/reducers/shoes/ShoesSlice';
import { baseURL } from '../../../../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { Button } from '../../../../../ui/Button';
import { SizeEditItem } from '../../components/SizeEditItem';
import { updateShoes } from '../../../../../../store/reducers/shoes/ShoesActionCreators';
import { ModalSearch } from '../../components/ModalSearch';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';
import { IShoesInfo, keyShoesInfoEnum } from '../AddShoesModal';
import { IconButton } from '../../../../../ui/IconButton';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HorizontalLine } from '../../../../../ui/HorizontalLine';

interface INewAdditionImages {
   id: number;
   img: null | Blob;
}

export const EditShoesModal: React.FC<EditShoesModalType> = ({ onClose }) => {
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
   const [id, setId] = useState<number>(0);
   const [error, setError] = useState('');
   const [foundShoes, setFoundShoes] = useState<null | IParticularShoes>(null);
   const [model, setModel] = useState('');
   const [price, setPrice] = useState(0);
   const [brand, setBrand] = useState(0);
   const [type, setType] = useState(0);
   const [color, setColor] = useState(0);
   const [season, setSeason] = useState(0);
   const [sex, setSex] = useState<string>('');
   const [addSizes, setAddSizes] = useState<ISize[]>([]);
   const [file, setFile] = useState<null | Blob>(null);
   const [infos, setInfos] = useState<IShoesInfo[]>([]);
   const [addedInfos, setAddedInfos] = useState<IShoesInfo[]>([]);
   const [deletedInfoIds, setDeletedInfoIds] = useState<number[]>([]);
   const [additionImages, setAdditionImages] = useState<IShoesImage[]>([]);
   const [deletedImages, setDeletedImages] = useState<string[]>([]);
   const [newAdditionImages, setNewAdditionImages] = useState<
      INewAdditionImages[]
   >([]);
   useEffect(() => {
      if (foundShoes) {
         setModel(foundShoes.model);
         setPrice(foundShoes.price);
         setBrand(foundShoes.brandId);
         setType(foundShoes.typeId);
         setColor(foundShoes.colorId);
         setSeason(foundShoes.seasonId);
         setSex(foundShoes.sex);
         setAdditionImages(foundShoes.shoes_images);
         setAddSizes([]);
         setInfos((prev) =>
            Array.isArray(foundShoes.shoes_infos)
               ? foundShoes.shoes_infos
               : prev,
         );
         for (let i = 0; i < 2 - foundShoes.shoes_images.length; i++) {
            setNewAdditionImages((prev) => [
               ...prev,
               { id: Date.now() + i, img: null },
            ]);
         }
      }
   }, [foundShoes]);

   const removeImage = (img: string) => {
      setDeletedImages((prev) => [...prev, img]);
      setAdditionImages((prev) => prev.filter((el) => el.img !== img));
      setNewAdditionImages((prev) => [...prev, { id: Date.now(), img: null }]);
   };

   const changeInfo = (
      key: keyShoesInfoEnum,
      value: string,
      id: number,
      setInfos: (value: React.SetStateAction<IShoesInfo[]>) => void,
   ) => {
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

   const addInfo = () => {
      setAddedInfos((prev) => {
         return [...prev, { title: '', description: '', id: Date.now() }];
      });
   };

   const removeInfo = (
      id: number,
      setInfos: (value: React.SetStateAction<IShoesInfo[]>) => void,
   ) => {
      setInfos((prev) => {
         return prev.filter((info) => info.id !== id);
      });
   };

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
      shoesReq
         .getShoesById(id)
         .then((data) => setFoundShoes(data))
         .catch((e) => setError(e.response.data));
   };

   const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) setFile(e.target.files[0]);
   };

   const handleChangeAdditionImage = (
      e: React.ChangeEvent<HTMLInputElement>,
      id: number,
   ) => {
      setNewAdditionImages((prev) =>
         prev.map((el) =>
            el.id === id ? { ...el, img: e.target.files![0] } : el,
         ),
      );
   };

   const handleSubmitUpdate = (shoes: IParticularShoes) => {
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
            shoes.shoes_sizes.map(({ sizeId, count, shoId }) => {
               return { sizeId, count, shoId };
            }),
         )
      ) {
         formData.append('sizes', JSON.stringify(addSizes));
      }
      if (file) {
         formData.append('file', file);
      }
      if (JSON.stringify(infos) !== JSON.stringify(shoes.shoes_infos)) {
         formData.append('shoesInfos', JSON.stringify(infos));
      }
      if (addedInfos.length > 0) {
         formData.append('newShoesInfos', JSON.stringify(addedInfos));
      }
      if (deletedInfoIds.length > 0) {
         formData.append('deletedShoesInfoIds', JSON.stringify(deletedInfoIds));
      }

      if (deletedImages.length > 0) {
         formData.append('deletedImagesNames', JSON.stringify(deletedImages));
      }

      newAdditionImages.forEach(({ img }) => {
         if (img) formData.append('newAdditionImages', img);
      });

      dispatch(
         updateShoes(formData, {
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
   };

   const handleChangeId = (newId: string) => {
      setId(Number(newId));
   };

   return (
      <div className='edit-shoes-modal__container  modal-container'>
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
            <HorizontalLine />
            {foundShoes && (
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleSubmitUpdate(foundShoes);
                  }}
                  className='edit-shoes-modal__edit-form'
               >
                  <div>
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
                  <div className='edit-shoes-modal__edit-images-container'>
                     <div className='edit-shoes-modal__edit-img-container'>
                        <div className='edit-shoes-modal__img-container'>
                           <img
                              src={
                                 file
                                    ? URL.createObjectURL(file)
                                    : baseURL + foundShoes.img + '.webp'
                              }
                              alt='Взуття'
                           />
                        </div>
                        <ModalInput
                           text='Змінити'
                           onChange={handleChangeFile}
                           type='file'
                           required={false}
                        />
                     </div>
                     {additionImages.map(({ img, id }) => (
                        <div
                           key={id}
                           className='edit-shoes-modal__edit-img-container'
                        >
                           <div className='edit-shoes-modal__img-container'>
                              <img src={baseURL + img + '.webp'} alt='Взуття' />
                           </div>
                           <div className='edit-shoes-modal__trash-button-container'>
                              <IconButton
                                 icon={faTrash}
                                 onClick={() => removeImage(img)}
                              />
                           </div>
                        </div>
                     ))}
                     {newAdditionImages.map(({ id, img }) => (
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
                              text='Завантажити'
                              onChange={(e) => handleChangeAdditionImage(e, id)}
                              type='file'
                              required={false}
                              accept='image/*'
                           />
                        </div>
                     ))}
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
                        const value = foundShoes.shoes_sizes.find((el) => {
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
                                    setInfos,
                                 )
                              }
                              value={info.title}
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
                                    setInfos,
                                 )
                              }
                              value={info.description}
                              type='text'
                              required={true}
                           />
                           <div className='add-shoes-modal__info-container__trash-button-container'>
                              <IconButton
                                 icon={faTrash}
                                 onClick={() => {
                                    removeInfo(info.id, setInfos);
                                    setDeletedInfoIds((prev) => [
                                       ...prev,
                                       info.id,
                                    ]);
                                 }}
                              />
                           </div>
                        </div>
                     ))}
                     {addedInfos.map((info) => (
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
                                    setAddedInfos,
                                 )
                              }
                              value={info.title}
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
                                    setAddedInfos,
                                 )
                              }
                              value={info.description}
                              type='text'
                              required={true}
                           />
                           <div className='add-shoes-modal__info-container__trash-button-container'>
                              <IconButton
                                 icon={faTrash}
                                 onClick={() =>
                                    removeInfo(info.id, setAddedInfos)
                                 }
                              />
                           </div>
                        </div>
                     ))}
                  </div>
                  <div>
                     <Button
                        disabled={foundShoes ? false : true}
                        buttonClass={ButtonClassEnum.PRIMARY}
                        buttonText='Оновити'
                     />
                  </div>
               </form>
            )}
         </div>
      </div>
   );
};
