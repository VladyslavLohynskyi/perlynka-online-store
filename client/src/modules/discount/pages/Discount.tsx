import React, { useEffect, useRef, useState } from 'react';

import { SortEnum } from '../../../store/reducers/filter/FilterSlice';
import { FilterCheckboxList } from '../../shop/components/filterCheckboxList';
import { useAppSelector } from '../../../hooks/redux';
import { NameOfCategoriesEnum } from '../../shop/pages';
import SkeletonShoesItem from '../../shop/components/skeletonShoesItem/SkeletonShoesItem';
import { IShoes } from '../../../store/reducers/shoes/ShoesSlice';
import { ShoesItem } from '../../shop/components/shoesItem';
interface ISelectFilterOption {
   id: number;
   text: string;
   sort: string;
}
export const Discount: React.FC = () => {
   const { brands, types, seasons, colors } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const [page, setPage] = useState(1);
   const [selectedSortFilter, setSelectedSortFilter] = useState('');
   const [selectedBrandsId, setSelectedBrandsId] = useState<number[]>([]);
   const [selectedTypesId, setSelectedTypesId] = useState<number[]>([]);
   const [selectedSeasonsId, setSelectedSeasonsId] = useState<number[]>([]);
   const [selectedColorsId, setSelectedColorsId] = useState<number[]>([]);
   const [isLoadingShoes, setIsLoadingShoes] = useState(true);
   const [shoes, setShoes] = useState<IShoes[]>([]);

   const handleClickSelectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSortFilter(e.target.value as SortEnum);
   };

   const handleClickBrandCheckbox = (id: number) => {
      if (!selectedBrandsId.includes(id)) {
         setSelectedBrandsId([...selectedBrandsId, id]);
      } else {
         setSelectedBrandsId(selectedBrandsId.filter((el) => el !== id));
      }
      setPage(1);
   };

   const handleClickTypeCheckbox = (id: number) => {
      if (!selectedTypesId.includes(id)) {
         setSelectedTypesId([...selectedTypesId, id]);
      } else {
         setSelectedTypesId(selectedTypesId.filter((el) => el !== id));
      }
      setPage(1);
   };

   const handleClickSeasonCheckbox = (id: number) => {
      if (!selectedSeasonsId.includes(id)) {
         setSelectedSeasonsId([...selectedSeasonsId, id]);
      } else {
         setSelectedSeasonsId(selectedSeasonsId.filter((el) => el !== id));
      }
      setPage(1);
   };

   const handleClickColorCheckbox = (id: number) => {
      if (!selectedColorsId.includes(id)) {
         setSelectedColorsId([...selectedColorsId, id]);
      } else {
         setSelectedColorsId(selectedColorsId.filter((el) => el !== id));
      }
      setPage(1);
   };

   const selectOptions: ISelectFilterOption[] = [
      { id: 1, text: 'За спаданням цін', sort: SortEnum.PRICE_DESC },
      { id: 2, text: 'За зростанням цін', sort: SortEnum.PRICE_ASC },
      { id: 3, text: 'Від новіших моделей', sort: SortEnum.CREATED_AT_DESC },
      { id: 4, text: 'Від давніших моделей', sort: SortEnum.CREATED_AT_ASC },
   ];
   return (
      <>
         <div className='shop__container'>
            <div className='shop'>
               <h2>Акції</h2>
               <div className='shop__top'>
                  <div className='shop__reset-filters' />
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
                        name={NameOfCategoriesEnum.BRAND}
                     />
                     <FilterCheckboxList
                        selectedValuesId={selectedTypesId}
                        handleClickCheckbox={handleClickTypeCheckbox}
                        list={types}
                        name={NameOfCategoriesEnum.TYPE}
                     />
                     <FilterCheckboxList
                        selectedValuesId={selectedSeasonsId}
                        handleClickCheckbox={handleClickSeasonCheckbox}
                        list={seasons}
                        name={NameOfCategoriesEnum.SEASON}
                     />
                     <FilterCheckboxList
                        selectedValuesId={selectedColorsId}
                        handleClickCheckbox={handleClickColorCheckbox}
                        list={colors}
                        name={NameOfCategoriesEnum.COLOR}
                     />
                  </aside>
                  <div className='shop__right-side'>
                     {isLoadingShoes ? (
                        <section className='shop__shoes-list'>
                           {Array.from({ length: 16 }).map((_, index) => (
                              <SkeletonShoesItem key={index} />
                           ))}
                        </section>
                     ) : (
                        <>
                           {!!shoes.length ? (
                              <section className='shop__shoes-list'>
                                 {shoes.map((shoes) => (
                                    <ShoesItem key={shoes.id} shoes={shoes} />
                                 ))}
                              </section>
                           ) : (
                              <p className='shop__empty-text'>
                                 Взуття з такою фільтрацією не знайденно
                              </p>
                           )}
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
