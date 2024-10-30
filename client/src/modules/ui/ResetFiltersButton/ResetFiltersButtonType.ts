import { SortEnum } from '../../../store/reducers/filter/FilterSlice';
import { SexEnum } from '../../../store/reducers/shoes/ShoesSlice';

export interface ResetFiltersButtonType
   extends React.HTMLAttributes<HTMLButtonElement> {
   selectedBrandsId: number[];
   selectedTypesId: number[];
   selectedSeasonsId: number[];
   selectedColorsId: number[];
   selectedSex: SexEnum;
   selectedSizesId: number[];
   selectedSortFilter: SortEnum;
   handleClickResetButton: () => void;
}
