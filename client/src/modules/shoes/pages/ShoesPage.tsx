import React, { useEffect, useState } from 'react';

import './ShoesPage.scss';
import { useParams } from 'react-router-dom';
import { IParticularShoes, getShoesById } from '../../../http/shoes';
import { baseURL } from '../../../utils/constants';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';
import { HorizontalLine } from '../../ui/HorizontalLine';
import { IconButton } from '../../ui/IconButton';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const ShoesPage: React.FC = () => {
   const { id } = useParams();
   const [currentShoes, setCurrentShoes] = useState<IParticularShoes>();
   const [selectedSize, setSelectedSize] = useState<number>(0);
   const [count, setCount] = useState<number>(1);
   useEffect(() => {
      if (id) getShoesById(+id).then((shoes) => setCurrentShoes(shoes));
   }, []);
   const handleClickSizeButton = (size: number) => {
      if (size !== selectedSize) {
         setSelectedSize(size);
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
                  <div className='shoes-page__sizes-buttons'>
                     {currentShoes.shoes_sizes.map(({ size, sizeId }) => (
                        <Button
                           key={sizeId}
                           buttonText={size.size}
                           buttonClass={
                              +size.size === selectedSize
                                 ? ButtonClassEnum.ACTIVE_SIZE_BUTTON
                                 : ButtonClassEnum.SIZE_BUTTON
                           }
                           buttonClick={() => handleClickSizeButton(+size.size)}
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
                           buttonText='Купити'
                           buttonClass={ButtonClassEnum.PROFILE}
                        />
                     </div>
                  </div>
                  <HorizontalLine />
                  <p>Відгуки:0</p>
               </div>
            </div>
         )}
      </div>
   );
};
