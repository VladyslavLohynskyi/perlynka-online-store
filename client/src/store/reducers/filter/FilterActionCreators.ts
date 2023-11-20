import { AppDispatch } from '../../store';
import { SexEnum } from '../shoes/ShoesSlice';
import { filterSlice } from './FilterSlice';

export const brandFilter = (id: number) => async (dispatch: AppDispatch) => {
   dispatch(filterSlice.actions.brandFilterSuccess(id));
};

export const typeFilter = (id: number) => async (dispatch: AppDispatch) => {
   dispatch(filterSlice.actions.typeFilterSuccess(id));
};

export const seasonFilter = (id: number) => async (dispatch: AppDispatch) => {
   dispatch(filterSlice.actions.seasonFilterSuccess(id));
};

export const colorFilter = (id: number) => async (dispatch: AppDispatch) => {
   dispatch(filterSlice.actions.colorFilterSuccess(id));
};

export const sexFilter = (sex: SexEnum) => async (dispatch: AppDispatch) => {
   dispatch(filterSlice.actions.sexFilterSuccess(sex));
};

export const sizeFilter = (id: number) => async (dispatch: AppDispatch) => {
   dispatch(filterSlice.actions.sizesFilterSuccess(id));
};
