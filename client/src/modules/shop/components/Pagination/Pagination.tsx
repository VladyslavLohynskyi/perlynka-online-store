import React from 'react';

import './Pagination.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { changePage } from '../../../../store/reducers/filter/FilterActionCreators';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';

export const Pagination: React.FC = () => {
   const { countOfShoesModels } = useAppSelector((state) => state.shoesReducer);
   const { page, limit } = useAppSelector((state) => state.filterReducer);
   const dispatch = useAppDispatch();
   const pages: number[] = [];
   const pageCount = Math.ceil(countOfShoesModels / limit);
   for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
   }
   const handleClick = (number: number) => {
      dispatch(changePage(number));
   };
   return (
      <div className='pagination__container'>
         {pages.map((number) => (
            <Button
               key={number}
               buttonText={number + ''}
               buttonClass={
                  page === number
                     ? ButtonClassEnum.ACTIVE_PAGINATION
                     : ButtonClassEnum.PAGINATION
               }
               buttonClick={() => handleClick(number)}
            />
         ))}
      </div>
   );
};
