import React, { StyleHTMLAttributes, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ShoesPage.scss';
import { useParams } from 'react-router-dom';
import ShoesReq, { IParticularShoes, IShoesImage } from '../../../http/shoes';
import { baseURL } from '../../../utils/constants';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';
import { HorizontalLine } from '../../ui/HorizontalLine';
import { IconButton } from '../../ui/IconButton';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Rating } from '../components/Rating';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
   addShoesToBasket,
   addShoesToBasketNotAuth,
} from '../../../store/reducers/basket/BasketActionCreators';

import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';

enum BuyButtonTextEnum {
   BUY = 'Купити',
   SIZE_ERROR = 'Виберіть Розмір',
}
export const ShoesPage: React.FC = () => {
   const { id } = useParams();
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const dispatch = useAppDispatch();
   const [currentShoes, setCurrentShoes] = useState<IParticularShoes>();
   const [selectedSizeId, setSelectedSizeId] = useState<number>(0);
   const [count, setCount] = useState<number>(1);
   const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
   const [slides, setSlides] = useState<IShoesImage[]>([]);
   const [buyButtonText, setBuyButtonText] = useState<BuyButtonTextEnum>(
      BuyButtonTextEnum.BUY,
   );
   const mainImageRef = useRef<HTMLImageElement>(null);
   const swiperRef = useRef<SwiperRef>(null);
   useEffect(() => {
      if (id)
         ShoesReq.getShoesById(+id).then((shoes) => {
            setCurrentShoes(shoes);
            setSlides([
               { id: 0, img: shoes.img, shoId: shoes.id },
               ...shoes.shoes_images,
            ]);
         });
   }, []);

   const handleClickSizeButton = (sizeId: number) => {
      setBuyButtonText(BuyButtonTextEnum.BUY);
      if (sizeId !== selectedSizeId) {
         setSelectedSizeId(sizeId);
      }
   };

   const handleClickIncrementCount = () => {
      if (count < 9) {
         setCount((prev) => prev + 1);
      }
   };

   const handleClickDecrementCount = () => {
      if (count > 1) {
         setCount((prev) => prev - 1);
      }
   };

   const handleClickBuyButton = async () => {
      if (currentShoes && selectedSizeId) {
         if (isAuth) {
            await dispatch(
               addShoesToBasket(currentShoes.id, selectedSizeId, count),
            );
         } else {
            const {
               id,
               model,
               price,
               img,
               typeId,
               colorId,
               seasonId,
               brandId,
               sex,
               shoes_sizes,
            } = currentShoes;
            dispatch(
               addShoesToBasketNotAuth({
                  id: uuidv4(),
                  count,
                  sho: {
                     id,
                     model,
                     price,
                     img,
                     typeId,
                     colorId,
                     seasonId,
                     brandId,
                     sex,
                  },
                  size: {
                     id: selectedSizeId + '',
                     size: shoes_sizes.find(
                        (el) => el.sizeId === selectedSizeId,
                     )!.size.size,
                  },
               }),
            );
         }
      } else {
         setBuyButtonText(BuyButtonTextEnum.SIZE_ERROR);
      }
   };

   return (
      <div className='shoes-page'>
         {currentShoes && (
            <>
               <div className='shoes-page__main'>
                  <div className='shoes-page__carousel-container'>
                     {slides.length > 1 && (
                        <div className='shoes-page__carousel-options'>
                           {slides.map(({ img, id }, index) => (
                              <div
                                 onClick={() => {
                                    setCurrentSlideIndex(index);
                                    swiperRef.current?.swiper.slideTo(index);
                                 }}
                                 key={id}
                                 className='shoes-page__carousel-option-container'
                              >
                                 <img
                                    src={baseURL + img + '.webp'}
                                    alt='Взуття'
                                    draggable={false}
                                 />
                              </div>
                           ))}
                        </div>
                     )}
                     <div className='shoes-page__swiper-container'>
                        <Swiper
                           ref={swiperRef}
                           onSlideChange={() => {
                              setCurrentSlideIndex(
                                 swiperRef.current!.swiper.activeIndex,
                              );
                           }}
                        >
                           {slides.map(({ img, id }) => (
                              <SwiperSlide key={id}>
                                 <div
                                    className='shoes-page__img-container'
                                    style={{
                                       height:
                                          mainImageRef.current?.clientWidth,
                                    }}
                                 >
                                    <img
                                       ref={mainImageRef}
                                       draggable={false}
                                       src={baseURL + img + '.webp'}
                                       alt='Взуття'
                                    />
                                 </div>
                              </SwiperSlide>
                           ))}
                        </Swiper>
                     </div>
                     <div className='shoes-page__carousel-dots-container'>
                        {slides.map(({ id }, index) => (
                           <div
                              key={id}
                              className={`shoes-page__carousel-dot ${
                                 currentSlideIndex === index &&
                                 'shoes-page__carousel-dot-active'
                              }`}
                              onClick={() => {
                                 setCurrentSlideIndex(index);
                                 swiperRef.current?.swiper.slideTo(index);
                              }}
                           ></div>
                        ))}
                     </div>
                  </div>
                  <div className='shoes-page__info-container'>
                     <h3 className='shoes-page__model-name main-page-title'>
                        {currentShoes.brand.name} {currentShoes.model}
                     </h3>
                     <p className='shoes-page__model-id label-text'>
                        ID товару: #{currentShoes.id}
                     </p>
                     <p className='shoes-page__model-price subtitle'>
                        Ціна: {currentShoes.price} грн.
                     </p>
                     <p className='shoes-page__model-size label-text'>
                        Розмір взуття:
                     </p>
                     <div className='shoes-page__sizes-buttons'>
                        {currentShoes.shoes_sizes.map(({ size, sizeId }) => (
                           <Button
                              key={sizeId}
                              buttonText={size.size}
                              buttonClass={
                                 +size.id === selectedSizeId
                                    ? ButtonClassEnum.ACTIVE_SIZE_BUTTON
                                    : ButtonClassEnum.SIZE_BUTTON
                              }
                              buttonClick={() =>
                                 handleClickSizeButton(+size.id)
                              }
                           />
                        ))}
                     </div>
                     <HorizontalLine />
                     <div className='shoes-page__buy-container'>
                        <div className='shoes-page__buy-counter'>
                           <IconButton
                              icon={faChevronUp}
                              onClick={handleClickIncrementCount}
                           />
                           <div className='shoes-page__buy-number'>
                              <p>{count}</p>
                           </div>
                           <IconButton
                              icon={faChevronDown}
                              onClick={handleClickDecrementCount}
                           />
                        </div>
                        <div className='shoes-page__buy-button'>
                           <Button
                              buttonText={buyButtonText}
                              buttonClass={
                                 buyButtonText === BuyButtonTextEnum.BUY
                                    ? ButtonClassEnum.BUY
                                    : ButtonClassEnum.DELETE
                              }
                              buttonClick={handleClickBuyButton}
                           />
                        </div>
                     </div>
                     <HorizontalLine />
                     <Rating shoId={currentShoes.id} />
                  </div>
               </div>
               <HorizontalLine />
               <div className='shoes-page__characteristics-container'>
                  <h3>Опис товару :</h3>
                  <p
                     style={{
                        background: '#d9d7d7',
                        padding: 10,
                     }}
                  >
                     Бренд : {currentShoes.brand.name}
                  </p>
                  <p
                     style={{
                        background: 'transparent',
                        padding: 10,
                     }}
                  >
                     Модель : {currentShoes.model}
                  </p>

                  <p
                     style={{
                        background: '#d9d7d7',
                        padding: 10,
                     }}
                  >
                     Тип : {currentShoes.type.name}
                  </p>
                  <p
                     style={{
                        background: 'transparent',
                        padding: 10,
                     }}
                  >
                     Cезон : {currentShoes.season.name}
                  </p>
                  <p
                     style={{
                        background: '#d9d7d7',
                        padding: 10,
                     }}
                  >
                     Колір : {currentShoes.color.name}
                  </p>
                  {currentShoes.shoes_infos.map((info, index) => (
                     <p
                        key={info.id}
                        style={{
                           background:
                              index % 2 === 0 ? 'transparent' : '#d9d7d7',
                           padding: 10,
                        }}
                     >
                        {info.title} : {info.description}
                     </p>
                  ))}
               </div>
               <HorizontalLine />
            </>
         )}
      </div>
   );
};
