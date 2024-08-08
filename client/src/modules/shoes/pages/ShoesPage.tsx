import React, { useEffect, useState } from 'react';
import './ShoesPage.scss';
import { useParams } from 'react-router-dom';
import ShoesReq, { IParticularShoes, IShoesImage } from '../../../http/shoes';
import { HorizontalLine } from '../../ui/HorizontalLine';
import ShoesCarousel from '../components/ShoesCarousel/ShoesCarousel';
import ShoesInfos from '../components/ShoesInfos/ShoesInfos';
import { Descriptions } from '../components/Descriptions';

export enum BuyButtonTextEnum {
   BUY = 'Купити',
   SIZE_ERROR = 'Виберіть Розмір',
}

export const ShoesPage: React.FC = () => {
   const { id } = useParams();
   const [currentShoes, setCurrentShoes] = useState<IParticularShoes>();
   const [slides, setSlides] = useState<IShoesImage[]>([]);
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
