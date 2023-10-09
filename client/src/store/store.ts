import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/UserSlice';
import shoesReducer from './reducers/shoes/ShoesSlice';
import adminsReducer from './reducers/admins/AdminsSlice';

const rootReducer = combineReducers({
   userReducer,
   shoesReducer,
   adminsReducer,
});

export const setupStore = () => {
   return configureStore({
      reducer: rootReducer,
   });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
