import { combineReducers } from 'redux';
import { constructorReducer } from './constructorReducer.js';

export const rootReducer = combineReducers({
  constructor: constructorReducer,
});