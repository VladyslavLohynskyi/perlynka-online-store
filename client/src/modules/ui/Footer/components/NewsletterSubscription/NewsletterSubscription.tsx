import React from 'react';
import './NewsletterSubscription.scss';
import { Button } from '../../../Button';
import { ButtonClassEnum } from '../../../Button/ButtonType';

export const NewsletterSubscription: React.FC = () => {
   return (
      <div className='newsletter-subscription'>
         <div className='newsletter-subscription__container'>
            <div className='newsletter-subscription__description-container'>
               <h2>Будь в курсі</h2>
               <p className='label-text'>
                  Підпишіться на останні оновлення та дізнавайтеся про новинки
                  та спеціальні пропозиції першими
               </p>
            </div>
            <form className='newsletter-subscription__form'>
               <input
                  type='email'
                  placeholder='Введіть вашу пошту'
                  required={true}
               />
               <Button
                  buttonClass={ButtonClassEnum.SUBSCRIPTION}
                  buttonText='Підписатися'
                  style={{ height: '36px' }}
               />
            </form>
         </div>
      </div>
   );
};
