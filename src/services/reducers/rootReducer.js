import { combineReducers } from 'redux';
import { stepReducer, cartReducer } from './appReducers.js';

export const rootReducer = combineReducers({
  step: stepReducer,
  cart: cartReducer,
});