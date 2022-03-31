import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,

  GET_INGREDIENT_DETAILS,

  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,

  SET_FLAG,
  REMOVE_FLAG

} from '../actions/index';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentIngredients: [],

  ingredientDetails: {},

  orderNumber: {},
  orderNumberRequest: false,
  orderNumberFailed: false,

  flag: {visibility: false}
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
        ingredientsFailed: false,
        flag: {visibility: false},
        orderNumber: {}
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

    case GET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.value
      }
    }

    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true
      }
    }

    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberRequest: false,
        orderNumberFailed: false
      }
    }

    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: true
      }
    }

    case SET_FLAG: {
      return {
        ...state,
        flag: {visibility: true}
      }
    }

    case REMOVE_FLAG: {
      return {
        ...state,
        flag: {visibility: false}
      }
    }

    default: {
      return state
    }
  }
}