import { combineReducers } from 'redux';
import { constructorReducer } from './constructorReducer.js';
import { userReducer } from './userReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  user: userReducer,
  order: orderReducer,
});