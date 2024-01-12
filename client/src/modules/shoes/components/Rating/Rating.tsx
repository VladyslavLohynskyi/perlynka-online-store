import React, { useState } from 'react';

import './Rating.scss';
import { IconButton } from '../../../ui/IconButton';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../../../hooks/redux';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../../utils/constants';

export const Rating: React.FC = () => {
   const { isAuth } = useAppSelector((state) => state.userReducer);
   const navigate = useNavigate();
   const [rating, setRating] = useState(0);
   const [hover, setHover] = useState(0);
   const handleClickStar = (index: number) => {
      if (isAuth) {
         setRating(index);
      }
   };

   const handleMouseEnterStar = (index: number) => {
      if (isAuth) {
         setHover(index);
      }
   };

   const handleMouseLeaveStar = () => {
      if (isAuth) {
         setHover(0);
      }
   };
   return (
      <>
         {!isAuth && (
            <div>
               Щоб залишити відгук{' '}
               <Button
                  buttonText='увійдіть'
                  buttonClass={ButtonClassEnum.LINK}
                  buttonClick={() => navigate(RoutesEnum.LOGIN)}
               />{' '}
               в обліковий запис
            </div>
         )}
         <div className='rating'>
            <div className='rating__container'>
               {[...Array(5)].map((_, index) => {
                  index += 1;
                  return (
                     <IconButton
                        key={index}
                        icon={faStar}
                        className={
                           index <= (hover || rating)
                              ? 'rating__star-active'
                              : 'rating__star'
                        }
                        onClick={() => handleClickStar(index)}
                        onMouseEnter={() => handleMouseEnterStar(index)}
                        onMouseLeave={() => handleMouseLeaveStar()}
                     />
                  );
               })}
            </div>
            <p className='rating__reviews'>Відгуків: 0</p>
         </div>{' '}
      </>
   );
};
