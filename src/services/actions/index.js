import { SERVICE_URL } from "../../utils/data";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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