import { combineReducers } from 'redux';
import { constructorReducer } from './constructorReducer.js';
import { userReducer } from './userReducer';
import { orderReducer } from './orderReducer';
import { wsReducer } from './wsReducer.ts';
import { wsAuthReducer } from './wsAuthReducer.ts';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  user: userReducer,
  order: orderReducer,
  ws: wsReducer,
  wsAuth: wsAuthReducer,
});