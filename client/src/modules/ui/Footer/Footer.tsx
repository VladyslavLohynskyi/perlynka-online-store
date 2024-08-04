import React from 'react';
import './Footer.scss';
import { FooterInfoItem } from './components/FooterInfoItem';
import { IconButton } from '../IconButton';
import {
   faInstagram,
   faTelegram,
   faViber,
} from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
export const Footer: React.FC = () => {
   return (
      <footer className='footer'>
         <div className='footer__container'>
            <div className='footer__logo-container'>
               <h2 className='footer__logo'>Перлинка</h2>
               <p className='label-text'>
                  - це мультибрендовий магазин дитячого-підліткового взуття, де
                  представлене лікувальне, профілактичне та звичайне взуття від
                  світових: SuperFit, GEOX, IMac, Tutubi, Tiflani та інші
               </p>
            </div>
            <div className='footer__info-container'>
               <h3>Інформація</h3>
               <FooterInfoItem text='Про нас' onClick={() => {}} />
               <FooterInfoItem text='Оплата і доставка' onClick={() => {}} />
               <FooterInfoItem text='Повернення та обмін' onClick={() => {}} />
               <FooterInfoItem text='Контакти' onClick={() => {}} />
            </div>

            <div className='footer__contact-container'>
               <p className='label-text'>
                  м. Львів, вул. Щирецька 36, ТВК "Південний"
               </p>
               <a
                  className='label-text'
                  href='mailto:perlynka.shoes.store@gmail.com'
               >
                  perlynka.shoes.store@gmail.com
               </a>
               <a className='label-text' href='href="tel:+380964668757'>
                  +38 (096) 466-87-57
               </a>
               <p className='label-text'>Працюємо: ПН-НД: 10:00-19:00</p>
               <div className='footer__contact-icons-container'>
                  <IconButton
                     icon={faInstagram as IconDefinition}
                     className='footer__icon'
                  />
                  <IconButton
                     icon={faTelegram as IconDefinition}
                     className='footer__icon'
                  />
                  <IconButton
                     icon={faViber as IconDefinition}
                     className='footer__icon'
                  />
                  <IconButton
                     icon={faEnvelope as IconDefinition}
                     className='footer__icon'
                  />
               </div>
            </div>
         </div>
      </footer>
   );
};
