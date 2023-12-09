import React, { useEffect, useState } from 'react';

import './ShoesPage.scss';
import { useParams } from 'react-router-dom';
import { IParticularShoes, getShoesById } from '../../../http/shoes';
import { baseURL } from '../../../utils/constants';

export const ShoesPage: React.FC = () => {
   const { id } = useParams();
   const [currentShoes, setCurrentShoes] = useState<IParticularShoes>();
   useEffect(() => {
      if (id) getShoesById(+id).then((shoes) => setCurrentShoes(shoes));
   }, []);
   return (
      <div className='shoes-page__container'>
         {currentShoes && (
            <div className='shoes-page__main'>
               <div className='shoes-page__img-container'>
                  <img src={baseURL + currentShoes.img} alt='Взуття' />
               </div>
               <div className='shoes-page__info-container'>
                  <h3 className='shoes-page__model-name'>
                     {currentShoes.brand.name} {currentShoes.model}
                  </h3>
                  <p className='shoes-page__model-id'>
                     ID товару: #{currentShoes.id}
                  </p>
                  <p className='shoes-page__model-price'>
                     Ціна: {currentShoes.price}грн
                  </p>
                  <p className='shoes-page__model-size'>Розмір взуття:</p>
                  <div className='shoes-page__sizes-buttons'></div>
                  <div className='shoes-page__buy-container'></div>
                  <p>Відгуки:0</p>
               </div>
            </div>
         )}
      </div>
   );
};
