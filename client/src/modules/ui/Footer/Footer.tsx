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
                  світових брендів: SuperFit, GEOX, IMac, Tutubi, Tiflani та
                  інші
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
               <p className='label-text'>м. Львів, вул. Щирецька 36</p>
               <a
                  className='label-text'
                  href='mailto:perlynka.shoes.store@gmail.com'
                  target='_blank'
               >
                  perlynka.shoes.store@gmail.com
               </a>
               <a className='label-text' href='tel:+380964668757'>
                  +38 (096) 466-87-57
               </a>
               <p className='label-text'>Працюємо: ПН-НД: 10:00-19:00</p>
               <div className='footer__contact-icons-container'>
                  <a
                     href='https://www.instagram.com/perlynka_shoes'
                     target='_blank'
                  >
                     <IconButton
                        icon={faInstagram as IconDefinition}
                        className='footer__icon'
                     />
                  </a>
                  <a href='https://t.me/KolyaMaseratti' target='_blank'>
                     <IconButton
                        icon={faTelegram as IconDefinition}
                        className='footer__icon'
                     />
                  </a>
                  <a
                     href='https://invite.viber.com/?g2=AQAvW%2F8r5XFDNU0ZYEQxJ9E4nY6HIa5ypojA4YoGXCs7oQJZjm7MtD7tnDlaw0Sl'
                     target='_blank'
                  >
                     <IconButton
                        icon={faViber as IconDefinition}
                        className='footer__icon'
                     />
                  </a>
                  <a
                     href='mailto:perlynka.shoes.store@gmail.com'
                     target='_blank'
                  >
                     <IconButton
                        icon={faEnvelope as IconDefinition}
                        className='footer__icon'
                     />
                  </a>
               </div>
            </div>
         </div>
         <div className='horizontal-line footer__horizontal-line'> </div>
         <div className='footer__copyright-container'>
            <p className='label-text'>
               © 2024 магазин дитячого-підліткового взуття — "Перлинка"
            </p>
         </div>
      </footer>
   );
};
