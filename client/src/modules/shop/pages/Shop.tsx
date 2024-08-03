import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';
import {
   brandFilter,
   typeFilter,
   seasonFilter,
   colorFilter,
   resetFilters,
   sortFilter,
} from '../../../store/reducers/filter/FilterActionCreators';
import { FilterCheckboxList } from '../components/filterCheckboxList';
import { FilterSizeCheckboxList } from '../components/filterSizeCheckboxList';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';
import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';
import { SortEnum } from '../../../store/reducers/filter/FilterSlice';
import { Pagination } from '../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../../modal/pages';
import useWindowSize from '../../../hooks/useWindowSize';
import { AsideMobileFiltersModal } from '../../modal/components/HeaderDropdown/pages/AsideMobileFiltersModal';

interface ISelectFilterOption {
   id: number;
   text: string;
   sort: string;
}

export const Shop: React.FC = () => {
   const { width } = useWindowSize();
   const dispatch = useAppDispatch();
   const [isMobileAsideFiltersShowed, setIsMobileAsideFiltersShowed] =
      useState<boolean>(false);
   const { shoes, brands, types, seasons, colors } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const {
      selectedBrandsId,
      selectedTypesId,
      selectedSeasonsId,
      selectedColorsId,
      selectedSex,
      selectedSizesId,
      selectedSortFilter,
   } = useAppSelector((state) => state.filterReducer);

   const selectOptions: ISelectFilterOption[] = [
      { id: 1, text: 'За спаданням цін', sort: SortEnum.PRICE_ASC },
      { id: 2, text: 'За зростанням цін', sort: SortEnum.PRICE_DESC },
      { id: 3, text: 'Від новіших моделей', sort: SortEnum.CREATED_AT_ASC },
      { id: 4, text: 'Від давніших моделей', sort: SortEnum.CREATED_AT_DESC },
   ];
   useEffect(() => {
      if (width > 767 && isMobileAsideFiltersShowed) {
         setIsMobileAsideFiltersShowed(false);
      }
   }, [width]);
   const handleClickBrandCheckbox = (id: number) => {
      dispatch(brandFilter(id));
   };

   const handleClickTypeCheckbox = (id: number) => {
      dispatch(typeFilter(id));
   };

   const handleClickSeasonCheckbox = (id: number) => {
      dispatch(seasonFilter(id));
   };

   const handleClickColorCheckbox = (id: number) => {
      dispatch(colorFilter(id));
   };
   const handleClickResetButton = () => {
      dispatch(resetFilters());
   };

   const handleClickSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(sortFilter(e.target.value as SortEnum));
   };
   const isFiltersEmpty =
      !selectedBrandsId.length &&
      !selectedTypesId.length &&
      !selectedSeasonsId.length &&
      !selectedSizesId.length &&
      !selectedColorsId.length &&
      selectedSex === SexEnum.UNISEX &&
      selectedSortFilter === SortEnum.PRICE_ASC;

   return (
      <>
         <div className='shop__container'>
            <div className='shop'>
               <div className='shop__top'>
                  <div className='shop__reset-filters'></div>
                  <div className='shop__top-filters'>
                     <p className='sort-title-text shop__top-filters__title '>
                        Сортування:{' '}
                     </p>
                     <select
                        className='sort-title-text shop__top-filters__select'
                        name='filters'
                        value={selectedSortFilter}
                        onChange={handleClickSelectSort}
                     >
                        {selectOptions.map((option) => (
                           <option key={option.id} value={option.sort}>
                              {option.text}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
               <div className='shop__main-container'>
                  <aside className='shop__aside-filters'>
                     <FilterCheckboxList
                        selectedValuesId={selectedBrandsId}
                        handleClickCheckbox={handleClickBrandCheckbox}
                        list={brands}
                        name='Виробник'
                     />
                     <FilterCheckboxList
                        selectedValuesId={selectedTypesId}
                        handleClickCheckbox={handleClickTypeCheckbox}
                        list={types}
                        name='Тип'
                     />
                     <FilterCheckboxList
                        selectedValuesId={selectedSeasonsId}
                        handleClickCheckbox={handleClickSeasonCheckbox}
                        list={seasons}
                        name='Сезон'
                     />
                     <FilterCheckboxList
                        selectedValuesId={selectedColorsId}
                        handleClickCheckbox={handleClickColorCheckbox}
                        list={colors}
                        name='Колір'
                     />
                     <FilterSizeCheckboxList />
                     <Button
                        buttonClass={
                           !isFiltersEmpty
                              ? ButtonClassEnum.BUY
                              : ButtonClassEnum.DISABLE
                        }
                        buttonText='Скинути фільтри'
                        disabled={isFiltersEmpty}
                        buttonClick={handleClickResetButton}
                        style={{ height: '30px', marginTop: '10px' }}
                     />
                  </aside>
                  <div className='shop__right-side'>
                     <section className='shop__shoes-list'>
                        {!!shoes.length &&
                           shoes.map((shoes) => (
                              <ShoesItem key={shoes.id} shoes={shoes} />
                           ))}
                     </section>
                     <Pagination />
                  </div>
               </div>
            </div>
         </div>

         <div className='shop__mobile-filter-button-container'>
            <Button
               buttonClass={ButtonClassEnum.MOBILE_FILTER}
               buttonText='Фільтр'
               buttonClick={() => setIsMobileAsideFiltersShowed(true)}
            >
               <FontAwesomeIcon icon={faSliders} className='fa-lg' />
            </Button>
         </div>
         <Modal
            modalPosition='mobile-aside-filter'
            isModalOpen={isMobileAsideFiltersShowed}
            onClose={() => setIsMobileAsideFiltersShowed(false)}
            onBlur={true}
         >
            <AsideMobileFiltersModal
               onClose={() => setIsMobileAsideFiltersShowed(false)}
            />
         </Modal>
      </>
   );
};
