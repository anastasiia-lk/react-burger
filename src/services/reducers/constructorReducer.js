import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  
  GET_CURRENT_INGREDIENTS,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,

} from '../actions/index';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentIngredients: [],

  ingredientDetails: {},

  orderDetails: {}
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        currentIngredients: action.ingredients.filter((item) => item.type !== 'bun'),
        ingredientsRequest: false,
        ingredientsFailed: false
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    }
    
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients].map(item => item._id === action._id ? {...item, qty: ++item.qty } : item)
      }
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients].map(item => item._id === action._id ? {...item, qty: --item.qty} : item)
      }
    }

    default: {
      return state
    }
  }
}