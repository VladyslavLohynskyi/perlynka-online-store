import React from 'react';
import './SkeletonShoesItem.scss';

const SkeletonShoesItem: React.FC = () => {
   return (
      <div className='skeleton-item'>
         <div className='skeleton-item__image'></div>
         <div className='skeleton-item__text'></div>
         <div className='skeleton-item__price'></div>
      </div>
   );
};

export default SkeletonShoesItem;
