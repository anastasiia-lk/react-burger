import { combineReducers } from 'redux';
import { constructorReducer } from './constructorReducer';
import { userReducer } from './userReducer';
import { orderReducer } from './orderReducer';
import { wsReducer as ws } from './wsReducer';
import { wsAuthReducer as wsAuth } from './wsAuthReducer';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  user: userReducer,
  order: orderReducer,
  ws,
  wsAuth,
});