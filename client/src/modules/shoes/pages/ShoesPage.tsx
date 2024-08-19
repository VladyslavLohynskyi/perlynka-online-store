import React, { useEffect, useState } from 'react';
import './ShoesPage.scss';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ShoesReq, { IParticularShoes, IShoesImage } from '../../../http/shoes';
import { HorizontalLine } from '../../ui/HorizontalLine';
import ShoesCarousel from '../components/ShoesCarousel/ShoesCarousel';
import ShoesInfos from '../components/ShoesInfos/ShoesInfos';
import { Descriptions } from '../components/Descriptions';
import { Loader } from '../../ui/Loader';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { RoutesEnum } from '../../../utils/constants';

export enum BuyButtonTextEnum {
   BUY = 'Купити',
   SIZE_ERROR = 'Виберіть Розмір',
}

export const ShoesPage: React.FC = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const [currentShoes, setCurrentShoes] = useState<IParticularShoes>();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [slides, setSlides] = useState<IShoesImage[]>([]);
   useEffect(() => {
      if (id) {
         setIsLoading(true);
         ShoesReq.getShoesById(+id)
            .then((shoes) => {
               setCurrentShoes(shoes);
               setSlides([
                  { id: 0, img: shoes.img, shoId: shoes.id },
                  ...shoes.shoes_images,
               ]);
            })
            .catch(() => {
               navigate(RoutesEnum.SHOP);
            })
            .finally(() => setIsLoading(false));
      }
   }, []);

   if (isLoading) {
      return <Loader className='shoes-page__loader' />;
   }
   return (
      <div className='shoes-page'>
         {currentShoes && (
            <>
               <div className='shoes-page__main'>
                  <ShoesCarousel slides={slides} />
                  <ShoesInfos currentShoes={currentShoes} />
               </div>
               <HorizontalLine style={{ marginBottom: 0 }} />
               <Descriptions currentShoes={currentShoes} />
            </>
         )}
      </div>
   );
};
