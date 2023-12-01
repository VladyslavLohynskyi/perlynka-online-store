import React, { useState } from 'react';

import './Pagination.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { changePage } from '../../../../store/reducers/filter/FilterActionCreators';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { IconButton } from '../../../ui/IconButton';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const Pagination: React.FC = () => {
   const { countOfShoesModels } = useAppSelector((state) => state.shoesReducer);
   const { page, limit } = useAppSelector((state) => state.filterReducer);
   const dispatch = useAppDispatch();
   const allPagesNumber = Math.ceil(countOfShoesModels / limit);
   const countPages = (number: number) => {
      const pagesNumber: number[] = [];
      for (let i = 0; i < number; i++) {
         pagesNumber.push(i + 1);
      }
      return pagesNumber;
   };
   const [pages, setPages] = useState<number[]>([
      ...countPages(allPagesNumber >= 9 ? 9 : allPagesNumber),
   ]);
   const handleClick = (number: number) => {
      dispatch(changePage(number));
   };
   return (
      <div className='pagination__container'>
         <IconButton icon={faArrowLeft} className='pagination__arrow-btn' />
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

         <IconButton icon={faArrowRight} className='pagination__arrow-btn' />
      </div>
   );
};
