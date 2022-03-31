import { SERVICE_URL } from "../../utils/data";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const SET_FLAG = 'SET_FLAG';
export const REMOVE_FLAG = 'REMOVE_FLAG';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(`${SERVICE_URL}/ingredients`)
    .then (res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status);
    })
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
    .then (res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status);
    })
    .then (res => {
      return res.order
    })
    .then (res => {
      console.log(res);
      dispatch ({
          type: POST_ORDER_SUCCESS,
          orderNumber: res,
        })
    })
    .then (res => {
      dispatch ({
        type: SET_FLAG
      })
      // console.log(res)
    })
  }
    // .then(res => {
    //   if (res) {
    //     console.log(res.order.number);
      //   dispatch ({
      //     type: POST_ORDER_SUCCESS,
      //     orderNumber: res.order.number,
      //   })
      // } else {
      //   dispatch ({
      //     type: POST_ORDER_FAILED,
      //   })
      // }})
    // }})}
}