import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/UserSlice';
import shoesReducer from './reducers/shoes/ShoesSlice';
import adminsReducer from './reducers/admins/AdminsSlice';
import filterReducer from './reducers/filter/FilterSlice';
import findUsersReducer from './reducers/findUsers/findUsersSlice';

const rootReducer = combineReducers({
   userReducer,
   shoesReducer,
   adminsReducer,
   findUsersReducer,
   filterReducer,
});

export const setupStore = () => {
   return configureStore({
      reducer: rootReducer,
   });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
