import { SortEnum } from '../../../../../../store/reducers/filter/FilterSlice';
import { SexEnum } from '../../../../../../store/reducers/shoes/ShoesSlice';

export interface AsideMobileFiltersModalType {
   selectedBrandsId: number[];
   selectedTypesId: number[];
   selectedSeasonsId: number[];
   selectedColorsId: number[];
   selectedSizesId: number[];
   selectedSex: SexEnum;
   selectedSortFilter: SortEnum;
   handleClickBrandCheckbox: (id: number) => void;
   handleClickTypeCheckbox: (id: number) => void;
   handleClickSeasonCheckbox: (id: number) => void;
   handleClickColorCheckbox: (id: number) => void;
   handleClickSizeCheckbox: (id: number) => void;
   handleClickResetButton: () => void;
   onClose: () => void;
}
