import React, { useEffect, useRef, useState } from 'react';
import './CreateSlideModal.scss';
import { CreateSlideModalType } from './CreateSlideModalType';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { Button } from '../../../../../ui/Button';
import { ButtonClassEnum } from '../../../../../ui/Button/ButtonType';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { createMainCarouselSlide } from '../../../../../../store/reducers/mainCarousel/MainCarouselActionCreators';

export const CreateSlideModal: React.FC<CreateSlideModalType> = ({
   onClose,
}) => {
   const dispatch = useAppDispatch();
   const [alt, setAlt] = useState<string>('');
   const [link, setLink] = useState<string>('');
   const [img, setImg] = useState<null | Blob>(null);

   const handleChangeAlt = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAlt(e.target.value);
   };

   const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLink(e.target.value);
   };

   const handleChangeMainPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setImg(e.target.files[0]);
      }
   };
   const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
      if (link) {
         formData.append('link', link);
      }
      formData.append('alt', alt);
      formData.append('images', img!);
      dispatch(createMainCarouselSlide(formData));
      onClose();
   };
   return (
      <div className='add-admin-modal__container modal-container'>
         <ModalHeader text={`Створити слайд`} onClose={onClose} />
         <form className='add-admin-modal__main' onSubmit={handleSubmit}>
            <ModalInput
               text={'Опис Слайду'}
               value={alt}
               placeholder={`Введіть опис`}
               onChange={handleChangeAlt}
               required={true}
            />
            <ModalInput
               text={'Опис Посилання'}
               value={link}
               placeholder={`Введіть опис`}
               onChange={handleChangeLink}
            />
            <div className='create-slide-modal__add-img-container'>
               <div className='create-slide-modal__img-container'>
                  {img && <img src={URL.createObjectURL(img)} alt={alt} />}
               </div>

               <ModalInput
                  text='Головне Фото'
                  onChange={handleChangeMainPhoto}
                  type='file'
                  required={false}
                  accept='image/*'
               />
            </div>
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
