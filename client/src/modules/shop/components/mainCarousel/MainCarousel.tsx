import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './MainCarousel.scss';
import { useRef } from 'react';

const MainCarousel = () => {
   const swiperRef = useRef(null);
   const images = [
      {
         src: 'https://via.placeholder.com/600x400?text=Slide+1',
         alt: 'Slide 1',
      },
      {
         src: 'https://via.placeholder.com/600x400?text=Slide+2',
         alt: 'Slide 2',
      },
      {
         src: 'https://via.placeholder.com/600x400?text=Slide+3',
         alt: 'Slide 3',
      },
      {
         src: 'https://via.placeholder.com/600x400?text=Slide+4',
         alt: 'Slide 4',
      },
      {
         src: 'https://via.placeholder.com/600x400?text=Slide+5',
         alt: 'Slide 5',
      },
   ];

   return (
      <Swiper
         modules={[Navigation, Pagination, Autoplay]}
         ref={swiperRef}
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
         {images.map((image, index) => (
            <SwiperSlide key={index}>
               <img
                  className='carousel-image'
                  src={image.src}
                  alt={image.alt || `Slide ${index + 1}`}
               />
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default MainCarousel;
