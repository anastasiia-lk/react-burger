import {
  DELETE_ITEM,
  CANCEL_PROMO,
  DECREASE_ITEM,
  INCREASE_ITEM,
  TAB_SWITCH
} from '../actions/cart';

const initialState = {
  ingredients: [],

  currentIngredients: [],

  ingredientDetails: {},

  orderDetails: {}
}