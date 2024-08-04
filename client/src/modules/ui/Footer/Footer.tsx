import React from 'react';
import './Footer.scss';
import { FooterInfoItem } from './components/FooterInfoItem';

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
         </div>
      </footer>
   );
};
