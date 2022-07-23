import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';

import { store } from '../store';
import { rootReducer } from '../reducers/rootReducer';
import {
  TWsActions
} from '../actions/wsActions';
import {
  TWsAuthActions
} from '../actions/wsAuthActions';
import {
  TUserActions,
} from '../actions/user';
import {
  TConstructorActions,
} from '../actions';
import {
  TOrderActions,
} from '../actions/order';
export type TRootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
  | TConstructorActions
  | TOrderActions
  | TUserActions
  | TWsActions
  | TWsAuthActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, TRootState, undefined, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;