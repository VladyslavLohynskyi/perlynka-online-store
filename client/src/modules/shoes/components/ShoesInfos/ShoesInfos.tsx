import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ShoesInfos.scss';
import { ShoesInfosType } from './ShoesInfosType';
import { IconButton } from '../../../ui/IconButton';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../ui/Button';
import { HorizontalLine } from '../../../ui/HorizontalLine';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { BuyButtonTextEnum } from '../../pages';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import {
   addShoesToBasket,
   addShoesToBasketNotAuth,
} from '../../../../store/reducers/basket/BasketActionCreators';
import { Rating } from '../Rating';

const ShoesInfos: React.FC<ShoesInfosType> = ({ currentShoes }) => {
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const dispatch = useAppDispatch();
   const [selectedSizeId, setSelectedSizeId] = useState<number>(0);
   const [buyButtonText, setBuyButtonText] = useState<BuyButtonTextEnum>(
      BuyButtonTextEnum.BUY,
   );
   const [count, setCount] = useState<number>(1);
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

   const handleClickBuyButton = async () => {
      if (currentShoes && selectedSizeId) {
         if (isAuth) {
            await dispatch(
               addShoesToBasket(currentShoes.id, selectedSizeId, count),
            );
         } else {
            const {
               id,
               model,
               price,
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
      <div className='shoes-page-info__container'>
         <h3 className='shoes-page-info__model-name main-page-title'>
            {currentShoes.brand.name} {currentShoes.model}
         </h3>
         <p className='shoes-page-info__model-id label-text'>
            ID товару: #{currentShoes.id}
         </p>
         <p className='shoes-page-info__model-price subtitle'>
            Ціна: {currentShoes.price} грн.
         </p>
         <p className='shoes-page-info__model-size label-text'>
            Розмір взуття:
         </p>
         <div className='shoes-page-info__sizes-buttons'>
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
         <div className='shoes-page-info__buy-container'>
            <div className='shoes-page-info__buy-counter'>
               <IconButton
                  icon={faChevronUp}
                  onClick={handleClickIncrementCount}
               />
               <div className='shoes-page-info__buy-number'>
                  <p>{count}</p>
               </div>
               <IconButton
                  icon={faChevronDown}
                  onClick={handleClickDecrementCount}
               />
            </div>
            <div className='shoes-page-info__buy-button'>
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
         <div className='shoes-page-info__communication-container'>
            <div className='shoes-page-info__communication-wrapper'>
               <a
                  href='https://invite.viber.com/?g2=AQAvW%2F8r5XFDNU0ZYEQxJ9E4nY6HIa5ypojA4YoGXCs7oQJZjm7MtD7tnDlaw0Sl'
                  target='_blank'
               >
                  <Button buttonClass={ButtonClassEnum.COMMUNICATION}>
                     Viber
                  </Button>
               </a>
               <a href='https://t.me/KolyaMaseratti' target='_blank'>
                  <Button buttonClass={ButtonClassEnum.COMMUNICATION}>
                     Telegram
                  </Button>
               </a>
            </div>
            <div className='shoes-page-info__communication-wrapper'>
               <a href='tel:+380964668757' target='_blank'>
                  <Button buttonClass={ButtonClassEnum.COMMUNICATION}>
                     +380964668757
                  </Button>
               </a>
               <a
                  href='https://www.instagram.com/perlynka_shoes'
                  target='_blank'
               >
                  <Button buttonClass={ButtonClassEnum.COMMUNICATION}>
                     Instagram
                  </Button>
               </a>
            </div>
         </div>
         <Rating shoId={currentShoes.id} />
      </div>
   );
};

export default ShoesInfos;
