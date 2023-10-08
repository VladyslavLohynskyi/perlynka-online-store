import { FC, useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Main } from './modules/main/pages/Main';
import { preloadList } from './store/reducers/shoes/ShoesActionCreators';
import { authUser } from './store/reducers/user/UserActionCreators';

const App: FC = () => {
   const dispatch = useAppDispatch();
   const user = useAppSelector((state) => state.userReducer);
   const shoes = useAppSelector((state) => state.shoesReducer);
   useEffect(() => {
      dispatch(authUser());
      dispatch(preloadList());
   }, []);
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
