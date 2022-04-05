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
  REMOVE_FLAG,

  UPDATE_INGREDIENTS,

  ADD_DRAGGED_INGREDIENTS,
  REMOVE_DRAGGED_INGREDIENTS,

  INIT_DRAGGED_INGREDIENTS,

  ADD_INGREDIENT_COUNTER,
  REMOVE_INGREDIENT_COUNTER,

  UPDATE_BUN_INGREDIENT,

  INIT_INGREDIENTS_COUNTER,
  ADD_BUN_COUNTER

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

  flag: {visibility: false},

  draggedIngredients: [0],

  board: 'default'
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
        ingredients: action.ingredients.map(item => ({...item, qty: 0})),
        currentIngredients: action.ingredients.filter((item) => item.type !== 'bun'),
        ingredientsRequest: false,
        ingredientsFailed: false,
        flag: {visibility: false},
        orderNumber: {},
        draggedIngredients: []
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
        draggedIngredients: [...state.draggedIngredients, {...action.value, key: Math.random()}]
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

    case ADD_BUN_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => item._id === action.value._id ? {...item, qty: item.qty + 2 } : {...item })
      }
    }

    case ADD_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => item._id === action.value._id ? {...item, qty: ++item.qty } : {...item })
      }
    }

    case REMOVE_INGREDIENT_COUNTER: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => item._id === action.value._id ? {...item, qty: --item.qty } : {...item })
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