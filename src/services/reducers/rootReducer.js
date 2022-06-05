import { combineReducers } from 'redux';
import { constructorReducer } from './constructorReducer.js';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
  user: userReducer,
});