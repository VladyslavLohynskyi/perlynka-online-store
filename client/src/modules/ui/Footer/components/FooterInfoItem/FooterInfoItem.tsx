import React from 'react';
import './FooterInfoItem.scss';
import { FooterInfoItemType } from './FooterInfoItemType';

export const FooterInfoItem: React.FC<FooterInfoItemType> = ({
   text,
   onClick,
}) => {
   return (
      <div className='footer-info-item__container' onClick={onClick}>
         <p className='label-text'>{text}</p>
      </div>
   );
};
