import { v4 as uuidv4 } from 'uuid';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,

  GET_INGREDIENT_DETAILS,

  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,

  SET_FLAG,
  REMOVE_FLAG,

  UPDATE_INGREDIENTS,

  ADD_DRAGGED_INGREDIENTS,
  REMOVE_DRAGGED_INGREDIENTS,

  ADD_INGREDIENT_COUNTER,
  REMOVE_INGREDIENT_COUNTER,

  UPDATE_BUN_INGREDIENT,

  INIT_INGREDIENTS_COUNTER,
  ADD_BUN_COUNTER,

  BURGER_REPLACE_INGREDIENTS,

  REMOVE_INGREDIENT_DETAILS

} from '../action-types/constructorActionTypes';

import { IIngredient } from '../types/data';
import { TConstructorActions } from '../actions/index';

export interface IInitialState {
  ingredients: Array<IIngredient>,
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,

  currentIngredients: Array<IIngredient>,

  ingredientDetails: |IIngredient | {},

  orderNumber: |number |{},
  orderNumberRequest: boolean,
  orderNumberFailed: boolean,

  flag: {visibility: boolean},

  draggedIngredients: Array<IIngredient>,

  board: string
}

const initialState: IInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  currentIngredients: [],

  ingredientDetails: {},

  orderNumber: {},
  orderNumberRequest: false,
  orderNumberFailed: false,

  flag: {visibility: false},

  draggedIngredients: [],

  board: 'default'
}

export const constructorReducer = (state = initialState, action: TConstructorActions):IInitialState  => {
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
        ingredients: action.payload.map(item => ({...item, qty: 0})),
        currentIngredients: action.payload.filter((item) => item.type !== 'bun'),
        ingredientsRequest: false,
        ingredientsFailed: false,
        flag: {visibility: false},
        orderNumber: {},
        draggedIngredients: [],
        ingredientDetails: {}
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    }
    case UPDATE_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(item => item._id !== action.value) 
      }
    }

    case INIT_INGREDIENTS_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => item.qty = 0 )
      } 
    }

    case ADD_DRAGGED_INGREDIENTS: {
      return {
        ...state,
        draggedIngredients: action.payload
      }
    }

    case UPDATE_BUN_INGREDIENT: {
      return {
        ...state,
        draggedIngredients: [...state.draggedIngredients].filter(item => item.type !== 'bun'),
        ingredients: [...state.ingredients].map(item => item.type === 'bun' ? {...item, qty: 0 } : {...item })
      }
    }

    case REMOVE_DRAGGED_INGREDIENTS: {
      return {
        ...state,
        draggedIngredients: [...state.draggedIngredients].filter(item => item.key !== action.value.key)
      }
    }

    case BURGER_REPLACE_INGREDIENTS: {
      const { selected, target } = action;
      return {
          ...state,
          draggedIngredients: [...state.draggedIngredients].map((item, idx) => {
            if (idx === selected) return [...state.draggedIngredients][target]
            if (idx === target) return [...state.draggedIngredients][selected]
            return item
          })
      };
  }

    case ADD_BUN_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => item._id === action.value._id ? {...item, qty: item.qty ? item.qty + 2 : 0 } : {...item })
      }
    }

    case ADD_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => item._id === action.value._id ? {...item, qty: item.qty ? ++item.qty : 0 } : {...item })
      }
    }

    case REMOVE_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => item._id === action.value._id ? {...item, qty: item.qty ? --item.qty : 0 } : {...item })
      }
    }

    case GET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.value
      }
    }

    case REMOVE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.value
      }
    }

    // case POST_ORDER_REQUEST: {
    //   return {
    //     ...state,
    //     orderNumberRequest: true
    //   }
    // }

    // case POST_ORDER_SUCCESS: {
    //   return {
    //     ...state,
    //     orderNumber: action.orderNumber,
    //     orderNumberRequest: false,
    //     orderNumberFailed: false
    //   }
    // }

    // case POST_ORDER_FAILED: {
    //   return {
    //     ...state,
    //     orderNumberRequest: false,
    //     orderNumberFailed: true
    //   }
    // }

    // case SET_FLAG: {
    //   return {
    //     ...state,
    //     flag: {visibility: true}
    //   }
    // }

    case REMOVE_FLAG: {
      return {
        ...state,
        flag: {visibility: false},
        draggedIngredients: [],
        ingredients: [...state.ingredients].map(item => item.qty !== 0 ? {...item, qty: 0 } : { ...item })
      }
    }

    default: {
      return state
    }
  }
}