import React, { useState } from 'react';
import './NewsletterSubscription.scss';
import { Button } from '../../../Button';
import { ButtonClassEnum } from '../../../Button/ButtonType';
import NewsletterSubscriptionReq from '../../../../../http/newsletterSubscription';

export const NewsletterSubscription: React.FC = () => {
   const [email, setEmail] = useState<string>("")
   const handleSubmitNewsletterSubscription = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
     return NewsletterSubscriptionReq.createSubscription(email);}
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
            <form onSubmit={handleSubmitNewsletterSubscription} className='newsletter-subscription__form'>
               <input
                  type='email'
                  placeholder='Введіть вашу пошту'
                  required={true}
                  onChange={(e)=> setEmail(e.target.value)}
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
