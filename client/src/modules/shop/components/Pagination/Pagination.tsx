import React from 'react';

import './Pagination.scss';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { IconButton } from '../../../ui/IconButton';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PaginationType } from './PaginationType';

export const Pagination: React.FC<PaginationType> = ({
   countOfShoesModels,
   page,
   limit,
   handleChangePage,
}) => {
   const allPagesNumber = Math.ceil(countOfShoesModels / limit);
   const countPages = (number: number) => {
      let pagesNumber: number[] = [];
      if (page >= 9) {
         pagesNumber = [page - 4, page - 3, page - 2, page - 1, page];
         for (let i = 1; i < 4; i++) {
            if (page + i > allPagesNumber) {
               pagesNumber.unshift(page - 4 - i);
            } else {
               pagesNumber.push(page + i);
            }
         }
      } else {
         for (let i = 0; i < number; i++) {
            pagesNumber.push(i + 1);
         }
      }
      return pagesNumber;
   };
   const pages: number[] = [
      ...countPages(allPagesNumber >= 9 ? 9 : allPagesNumber),
   ];
   const handleClick = (number: number) => {
      handleChangePage(number);
      window.scrollTo({ top: 0 });
   };
   const handleClickRightArrow = () => {
      handleChangePage(page + 1);
      window.scrollTo({ top: 0 });
   };
   const handleClickLeftArrow = () => {
      handleChangePage(page - 1);
      window.scrollTo({ top: 0 });
   };
   return (
      <div className='pagination__container'>
         {page > 1 && (
            <IconButton
               icon={faArrowLeft}
               className='pagination__arrow-btn'
               onClick={handleClickLeftArrow}
            />
         )}
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
         {page !== allPagesNumber && !!allPagesNumber && (
            <IconButton
               icon={faArrowRight}
               className='pagination__arrow-btn'
               onClick={handleClickRightArrow}
            />
         )}
      </div>
   );
};
