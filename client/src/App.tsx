import { FC, useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Main } from './modules/main/pages/Main';
import { authUser } from './store/reducers/user/UserActionCreatores';

const App: FC = () => {
   const dispatch = useAppDispatch();
   const { isLoading } = useAppSelector((state) => state.userReducer);
   useEffect(() => {
      dispatch(authUser());
   }, []);
   if (isLoading) {
      return <div>Loading...</div>;
   }
   return (
      <div>
         <Main />
      </div>
   );
};

export default App;
