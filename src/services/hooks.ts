import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { AppDispatch, TRootState } from './types';

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;