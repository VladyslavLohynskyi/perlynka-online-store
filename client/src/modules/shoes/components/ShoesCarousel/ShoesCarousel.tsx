import './ShoesCarousel.scss';
import React, { useRef, useState } from 'react';
import { ShoesCarouselType } from './ShoesCarouselType';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';
import {
   GOOGLE_CLOUD_BUCKET_NAME,
   GOOGLE_CLOUD_STORAGE_BASE_URL,
} from '../../../../utils/constants';

const ShoesCarousel: React.FC<ShoesCarouselType> = ({ slides }) => {
   const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
   const mainImageRef = useRef<HTMLImageElement>(null);
   const swiperRef = useRef<SwiperRef>(null);
   return (
      <div className='shoes-page-carousel__container'>
         {slides.length > 1 && (
            <div className='shoes-page-carousel__options'>
               {slides.map(({ img, id }, index) => (
                  <div
                     onClick={() => {
                        setCurrentSlideIndex(index);
                        swiperRef.current?.swiper.slideTo(index);
                     }}
                     key={id}
                     className='shoes-page-carousel__option-container'
                  >
                     <img
                        src={`${GOOGLE_CLOUD_STORAGE_BASE_URL}/${GOOGLE_CLOUD_BUCKET_NAME}/images/${img}.webp`}
                        alt='Взуття'
                        draggable={false}
                     />
                  </div>
               ))}
            </div>
         )}
         <div className='shoes-page-carousel__swiper-container'>
            <Swiper
               ref={swiperRef}
               onSlideChange={() => {
                  setCurrentSlideIndex(swiperRef.current!.swiper.activeIndex);
               }}
            >
               {slides.map(({ img, id }) => (
                  <SwiperSlide key={id}>
                     <div
                        className='shoes-page-carousel__img-container'
                        style={{
                           height: mainImageRef.current?.clientWidth,
                        }}
                     >
                        <img
                           ref={mainImageRef}
                           draggable={false}
                           src={`${GOOGLE_CLOUD_STORAGE_BASE_URL}/${GOOGLE_CLOUD_BUCKET_NAME}/images/${img}.webp`}
                           alt='Взуття'
                        />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
         <div className='shoes-page-carousel__dots-container'>
            {slides.map(({ id }, index) => (
               <div
                  key={id}
                  className={`shoes-page-carousel__dot ${
                     currentSlideIndex === index &&
                     'shoes-page-carousel__dot-active'
                  }`}
                  onClick={() => {
                     setCurrentSlideIndex(index);
                     swiperRef.current?.swiper.slideTo(index);
                  }}
               ></div>
            ))}
         </div>
      </div>
   );
};

export default ShoesCarousel;
