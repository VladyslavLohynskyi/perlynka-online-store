import React from 'react';
import './SkeletonShoesItem.scss';

const SkeletonShoesItem: React.FC = () => {
   return (
      <div className='skeleton-item'>
         <div className='skeleton-item__image-container'>
            <div className='skeleton-item__image'></div>
         </div>
         <div className='skeleton-item__info'>
            <div className='skeleton-item__text'></div>
            <div className='skeleton-item__price-container'>
               <div className='skeleton-item__price'></div>
            </div>
         </div>
      </div>
   );
};

export default SkeletonShoesItem;
