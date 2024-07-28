import React, { useState, useEffect } from 'react';
import { SizeEditItemType } from './SizeEditItemType';
import './SizeEditItem.scss';

export const SizeEditItem: React.FC<SizeEditItemType> = ({
   size,
   id,
   onChangeSize,
   value,
}) => {
   const [count, setCount] = useState(value || 0);

   useEffect(() => {
      onChangeSize(Number(id), count);
   }, [count]);
   return (
      <div className='size-edit-item__container'>
         <div className='size-edit-item__size label-text'>{size}</div>
         <input
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min={0}
            type='number'
         />
      </div>
   );
};
