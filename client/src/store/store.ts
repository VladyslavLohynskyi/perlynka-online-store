import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/UserSlice';
import shoesReducer from './reducers/shoes/ShoesSlice';

const rootReducer = combineReducers({
   userReducer,
   shoesReducer,
});

export const setupStore = () => {
   return configureStore({
      reducer: rootReducer,
   });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
