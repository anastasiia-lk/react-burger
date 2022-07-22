import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
// import { AppDispatch, AppThunk, TRootState } from '../services/types/index';
import { AppDispatch, AppThunk, TRootState } from '../services/types/index';

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();