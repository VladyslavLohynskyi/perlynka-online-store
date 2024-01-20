import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ShoesPage.scss';
import { useParams } from 'react-router-dom';
import { IParticularShoes, getShoesById } from '../../../http/shoes';
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
   const [buyButtonText, setBuyButtonText] = useState<BuyButtonTextEnum>(
      BuyButtonTextEnum.BUY,
   );
   useEffect(() => {
      if (id) getShoesById(+id).then((shoes) => setCurrentShoes(shoes));
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

   const handleClickBuyButton = () => {
      if (currentShoes && selectedSizeId) {
         if (isAuth) {
            dispatch(addShoesToBasket(currentShoes.id, selectedSizeId, count));
         } else {
            const {
               id,
               model,
               price,
               rating,
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
                     rating,
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
                              +size.id === selectedSizeId
                                 ? ButtonClassEnum.ACTIVE_SIZE_BUTTON
                                 : ButtonClassEnum.SIZE_BUTTON
                           }
                           buttonClick={() => handleClickSizeButton(+size.id)}
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
                  <Rating />
               </div>
            </div>
         )}
      </div>
   );
};
