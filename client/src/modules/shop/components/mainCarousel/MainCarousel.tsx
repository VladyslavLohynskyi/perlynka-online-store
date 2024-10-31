import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './MainCarousel.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../../../modal/pages';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { Role } from '../../../../store/reducers/user/UserSlice';
import { CreateSlideModal } from '../../../modal/components/HeaderDropdown/pages/CreateSlideModal';
import {
   deleteMainCarouselSlide,
   getMainCarouselSlides,
} from '../../../../store/reducers/mainCarousel/MainCarouselActionCreators';
import {
   GOOGLE_CLOUD_BUCKET_NAME,
   GOOGLE_CLOUD_STORAGE_BASE_URL,
} from '../../../../utils/constants';

import { IconButton } from '../../../ui/IconButton';
import SkeletonSlide from '../skeletonSlide/SkeletonSlide';
import { Slide } from './components/Slide';

const MainCarousel = () => {
   const dispatch = useAppDispatch();
   const [isCreateSlideModalOpened, setIsCreateSlideModalOpened] =
      useState(false);
   const { user } = useAppSelector((state) => state.userReducer);
   const { isLoading, slides } = useAppSelector(
      (state) => state.mainCarouselReducer,
   );

   useEffect(() => {
      dispatch(getMainCarouselSlides());
   }, []);

   const handleDeleteSlide = (slideId: number) => {
      dispatch(deleteMainCarouselSlide(slideId));
   };
   return (
      <>
         {user?.role === Role.ADMIN && (
            <div className='main-carousel__admin-action-panel'>
               <Button
                  buttonClass={ButtonClassEnum.PRIMARY}
                  buttonText='Створити Слайд'
                  onClick={() => setIsCreateSlideModalOpened(true)}
                  style={{ width: '160px' }}
               />
            </div>
         )}

         <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
               640: { slidesPerView: 1 },
               768: { slidesPerView: 2 },
               1024: { slidesPerView: 3 },
            }}
         >
            {isLoading
               ? [...Array(3)].map((_, index) => (
                    <SwiperSlide key={`skeleton-${index}`}>
                       <SkeletonSlide />
                    </SwiperSlide>
                 ))
               : slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                       <Slide slide={slide} index={index} />
                    </SwiperSlide>
                 ))}
         </Swiper>

         <Modal
            isModalOpen={isCreateSlideModalOpened}
            onClose={() => setIsCreateSlideModalOpened(false)}
            onBlur={true}
            modalPosition='modal-position__admin'
         >
            <CreateSlideModal
               onClose={() => setIsCreateSlideModalOpened(false)}
            />
         </Modal>
      </>
   );
};

export default MainCarousel;
