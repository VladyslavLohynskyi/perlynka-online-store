import React, { useEffect, useState } from 'react';
import './ShoesPage.scss';
import { useParams } from 'react-router-dom';
import ShoesReq, { IParticularShoes, IShoesImage } from '../../../http/shoes';
import { HorizontalLine } from '../../ui/HorizontalLine';
import ShoesCarousel from '../components/ShoesCarousel/ShoesCarousel';
import ShoesInfos from '../components/ShoesInfos/ShoesInfos';

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
