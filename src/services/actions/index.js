import { SERVICE_URL } from "../../utils/data";
import { v4 as uuidv4 } from 'uuid';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const SET_FLAG = 'SET_FLAG';
export const REMOVE_FLAG = 'REMOVE_FLAG';

export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';

export const ADD_DRAGGED_INGREDIENTS = 'ADD_DRAGGED_INGREDIENTS';

export const REMOVE_DRAGGED_INGREDIENTS = 'REMOVE_DRAGGED_INGREDIENTS';

export const ADD_INGREDIENT_COUNTER = 'ADD_INGREDIENT_COUNTER';
export const REMOVE_INGREDIENT_COUNTER = 'REMOVE_INGREDIENT_COUNTER';

export const  INIT_INGREDIENTS_COUNTER = 'INIT_INGREDIENTS_COUNTER';

export const UPDATE_BUN_INGREDIENT = 'UPDATE_BUN_INGREDIENT';

export const ADD_BUN_COUNTER = 'ADD_BUN_COUNTER';

export const BURGER_REPLACE_INGREDIENTS = 'BURGER_REPLACE_INGREDIENTS';

export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
}

export function addIngredient(ingredient) {
  return function(dispatch, getState) {
    const constructorIngredients = getState().constructor.draggedIngredients;
    const keyId = uuidv4();
    const payload = [
      ...constructorIngredients,
      {
        ...ingredient,
        key: keyId, 
        index: ++[...constructorIngredients].length
      }
    ]
    dispatch({ type: ADD_DRAGGED_INGREDIENTS, payload });
    console.log(payload);
  }
}

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(`${SERVICE_URL}/ingredients`)
    .then(checkResponse)
    .then (res => {
      return res.data
    })
    .then(res => {
      if (res) {
        dispatch ({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res,
        })
      } else {
        dispatch ({
          type: GET_INGREDIENTS_FAILED,
        })
      }})
      .catch((err) => {
        console.log(err)
      })
    }
}

export function postOrder(ingredientsArray) {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    fetch(`${SERVICE_URL}/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        "ingredients": ingredientsArray
        })  
    }
    )
    .then(checkResponse)
    .then (res => {
      return res.order
    })
    .then(res => {
      if (res) {
        dispatch ({
          type: POST_ORDER_SUCCESS,
          orderNumber: res,
        })
      } else {
        dispatch ({
          type: POST_ORDER_FAILED,
        })
      }})
    .then (res => {
      dispatch ({
        type: SET_FLAG
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export function removeIngredientDetails(value) {
  return { type: REMOVE_INGREDIENT_DETAILS, value }
}

export function setIngredientDetails(value) {
  return { type: GET_INGREDIENT_DETAILS, value }
}

export function cleanConstructor() {
  return { type: REMOVE_FLAG }
}

export function updateBun(value) {
  return { type: UPDATE_BUN_INGREDIENT, value }
}