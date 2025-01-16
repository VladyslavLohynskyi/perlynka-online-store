import React, { useEffect, useRef, useState } from 'react';
import ShoesReq from '../../../http/shoes';
import { SortEnum } from '../../../store/reducers/filter/FilterSlice';
import { FilterCheckboxList } from '../../shop/components/filterCheckboxList';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { NameOfCategoriesEnum } from '../../shop/pages';
import SkeletonShoesItem from '../../shop/components/skeletonShoesItem/SkeletonShoesItem';
import {
   IShoes,
   IShoesWithSizes,
   SexEnum,
} from '../../../store/reducers/shoes/ShoesSlice';
import { ShoesItem } from '../../shop/components/shoesItem';
import { FilterSizeCheckboxList } from '../../shop/components/filterSizeCheckboxList';
import { ResetFiltersButton } from '../../ui/ResetFiltersButton';
import { Button } from '../../ui/Button';
import { ButtonClassEnum } from '../../ui/Button/ButtonType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '../../shop/components/Pagination';
import { Modal } from '../../modal/pages';
import { AsideMobileFiltersModal } from '../../modal/components/HeaderDropdown/pages/AsideMobileFiltersModal';
import { preloadList } from '../../../store/reducers/shoes/ShoesActionCreators';
import { preloadFilter } from '../../../store/reducers/filter/FilterActionCreators';
interface ISelectFilterOption {
   id: number;
   text: string;
   sort: string;
}
export const Discount: React.FC = () => {
   const dispatch = useAppDispatch();
   const { brands, types, seasons, colors } = useAppSelector(
      (state) => state.shoesReducer,
   );

   const [isMobileAsideFiltersShowed, setIsMobileAsideFiltersShowed] =
      useState<boolean>(false);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(16);
   const [count, setCount] = useState(0);
   const [selectedSortFilter, setSelectedSortFilter] = useState<SortEnum>(
      SortEnum.CREATED_AT_DESC,
   );
   const [selectedBrandsId, setSelectedBrandsId] = useState<number[]>([]);
   const [selectedTypesId, setSelectedTypesId] = useState<number[]>([]);
   const [selectedSeasonsId, setSelectedSeasonsId] = useState<number[]>([]);
   const [selectedColorsId, setSelectedColorsId] = useState<number[]>([]);
   const [selectedSizesId, setSelectedSizesId] = useState<number[]>([]);
   const [selectedSex, setSelectedSex] = useState<SexEnum>(SexEnum.UNISEX);
   const [isLoadingShoes, setIsLoadingShoes] = useState(true);
   const [shoes, setShoes] = useState<IShoesWithSizes[]>([]);

   useEffect(() => {
      (async () => {
         if (brands === null) {
            await dispatch(preloadList());
         }
      })();
   }, []);

   useEffect(() => {
      setIsLoadingShoes(true);
      ShoesReq.getAllShoes({
         brandsId: selectedBrandsId,
         typesId: selectedTypesId,
         colorsId: selectedColorsId,
         sizesId: selectedSizesId,
         seasonsId: selectedSeasonsId,
         sex: selectedSex,
         sortBy: selectedSortFilter,
         offset: limit * (page - 1),
         limit,
         promotion: true,
      })
         .then(({ count, rows }) => {
            setShoes(rows);
            setCount(count);
         })
         .finally(() => setIsLoadingShoes(false));
   }, [
      selectedBrandsId,
      selectedTypesId,
      selectedColorsId,
      selectedSizesId,
      selectedSeasonsId,
      selectedSex,
      selectedSortFilter,
      page,
   ]);
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

   const handleClickSizeCheckbox = (id: number) => {
      if (!selectedSizesId.includes(id)) {
         setSelectedSizesId([...selectedSizesId, id]);
      } else {
         setSelectedSizesId(selectedSizesId.filter((el) => el !== id));
      }
      setPage(1);
   };

   const handleClickResetButton = () => {
      setPage(1);
      setSelectedBrandsId([]);
      setSelectedColorsId([]);
      setSelectedSeasonsId([]);
      setSelectedSex(SexEnum.UNISEX);
      setSelectedSizesId([]);
      setSelectedSortFilter(SortEnum.CREATED_AT_DESC);
      setSelectedTypesId([]);
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
                        aria-label='Сортувати за'
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
                     <FilterSizeCheckboxList
                        selectedValuesId={selectedSizesId}
                        handleClickCheckbox={handleClickSizeCheckbox}
                     />
                     <ResetFiltersButton
                        selectedBrandsId={selectedBrandsId}
                        selectedColorsId={selectedColorsId}
                        selectedSeasonsId={selectedSeasonsId}
                        selectedSex={selectedSex}
                        selectedSizesId={selectedSizesId}
                        selectedSortFilter={selectedSortFilter}
                        selectedTypesId={selectedTypesId}
                        handleClickResetButton={handleClickResetButton}
                        style={{ height: '30px', marginTop: '10px' }}
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
                           <Pagination
                              page={page}
                              limit={limit}
                              countOfShoesModels={count}
                              handleChangePage={(number: number) =>
                                 setPage(number)
                              }
                           />
                        </>
                     )}
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
         </div>
         <Modal
            modalPosition='mobile-aside-filter'
            isModalOpen={isMobileAsideFiltersShowed}
            onClose={() => setIsMobileAsideFiltersShowed(false)}
            onBlur={true}
         >
            <AsideMobileFiltersModal
               handleClickBrandCheckbox={handleClickBrandCheckbox}
               handleClickColorCheckbox={handleClickColorCheckbox}
               handleClickSeasonCheckbox={handleClickSeasonCheckbox}
               handleClickSizeCheckbox={handleClickSizeCheckbox}
               handleClickTypeCheckbox={handleClickTypeCheckbox}
               selectedBrandsId={selectedBrandsId}
               selectedColorsId={selectedColorsId}
               selectedSeasonsId={selectedSeasonsId}
               selectedSex={selectedSex}
               selectedSizesId={selectedSizesId}
               selectedSortFilter={selectedSortFilter}
               selectedTypesId={selectedTypesId}
               handleClickResetButton={handleClickResetButton}
               onClose={() => setIsMobileAsideFiltersShowed(false)}
            />
         </Modal>
      </>
   );
};
