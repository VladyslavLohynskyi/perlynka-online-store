import { FC, useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Main } from './modules/main/pages/Main';
import {
   getAllShoesByFilter,
   preloadList,
} from './store/reducers/shoes/ShoesActionCreators';
import { authUser } from './store/reducers/user/UserActionCreators';
import {
   changePage,
   preloadFilter,
} from './store/reducers/filter/FilterActionCreators';

const App: FC = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.userReducer);
   const shoes = useAppSelector((state) => state.shoesReducer);
   const filter = useAppSelector((state) => state.filterReducer);
   useEffect(() => {
      (async () => {
         await dispatch(preloadList());
         dispatch(preloadFilter());
         await dispatch(authUser());
      })();
   }, []);

   useEffect(() => {
      dispatch(changePage(1));
      dispatch(
         getAllShoesByFilter({
            brandsId: filter.selectedBrandsId,
            typesId: filter.selectedTypesId,
            seasonsId: filter.selectedSeasonsId,
            colorsId: filter.selectedColorsId,
            sex: filter.selectedSex,
            sizesId: filter.selectedSizesId,
            sortBy: filter.selectedSortFilter,
            limit: filter.limit,
            offset: filter.limit * (filter.page - 1),
         }),
      );
   }, [
      filter.selectedBrandsId,
      filter.selectedTypesId,
      filter.selectedSeasonsId,
      filter.selectedColorsId,
      filter.selectedSex,
      filter.selectedSizesId,
      filter.selectedSortFilter,
   ]);

   useEffect(() => {
      dispatch(
         getAllShoesByFilter({
            brandsId: filter.selectedBrandsId,
            typesId: filter.selectedTypesId,
            seasonsId: filter.selectedSeasonsId,
            colorsId: filter.selectedColorsId,
            sex: filter.selectedSex,
            sizesId: filter.selectedSizesId,
            sortBy: filter.selectedSortFilter,
            limit: filter.limit,
            offset: filter.limit * (filter.page - 1),
         }),
      );
   }, [filter.page]);
   if (user.isLoading || shoes.isLoading) {
      return <div>Loading...</div>;
   }
   return (
      <div>
         <Main />
      </div>
   );
};

export default App;
