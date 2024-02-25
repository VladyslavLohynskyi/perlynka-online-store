import React from 'react';

import './CheckoutSuccess.scss';
import { IconButton } from '../../../ui/IconButton';

export const CheckoutSuccess: React.FC = () => {
   return (
      <div className='checkout-success__container'>
         <h4>Ваше замовлення оброблено успішно.</h4>
         <p>На вашу електрону пошту надісланий детальний опис товару.</p>
         <p>Ми зателефонуємо вам, щоб оточнити деталі замовлення.</p>
         <p>Дякуєм за довіру, магазин Перлинка.</p>
      </div>
   );
};
