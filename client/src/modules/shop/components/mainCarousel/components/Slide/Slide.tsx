import React, { useEffect, useState } from 'react';

import SkeletonSlide from '../../../skeletonSlide/SkeletonSlide';
import { IconButton } from '../../../../../ui/IconButton';
import { Role } from '../../../../../../store/reducers/user/UserSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { SlideType } from './SlideType';
import {
   GOOGLE_CLOUD_BUCKET_NAME,
   GOOGLE_CLOUD_STORAGE_BASE_URL,
} from '../../../../../../utils/constants';

import { deleteMainCarouselSlide } from '../../../../../../store/reducers/mainCarousel/MainCarouselActionCreators';

export const Slide: React.FC<SlideType> = ({ slide, index }) => {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector((state) => state.userReducer);
   const [isLoading, setIsLoading] = useState(true);
   const handleDeleteSlide = (slideId: number) => {
      dispatch(deleteMainCarouselSlide(slideId));
   };
   return (
      <>
         {user?.role === Role.ADMIN && (
            <IconButton
               style={{
                  position: 'relative',
                  width: '70px',
                  top: '30px',
                  color: 'red',
                  fontSize: '25px',
               }}
               icon={faClose}
               onClick={() => {
                  handleDeleteSlide(slide.id);
               }}
            />
         )}
         <img
            onLoad={() => {
               setIsLoading(false);
            }}
            className='main-carousel__carousel-image'
            src={`${GOOGLE_CLOUD_STORAGE_BASE_URL}/${GOOGLE_CLOUD_BUCKET_NAME}/main-carousel/${slide.id}/${slide.img}.webp`}
            alt={slide.alt || `Slide ${index + 1}`}
            style={{ display: isLoading ? 'none' : 'block' }}
         />
         {isLoading && <SkeletonSlide />}
      </>
   );
};
