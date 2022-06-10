import { orderFetch } from '../../utils/api';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const IS_EMPTY = 'IS_EMPTY';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export function sendOrder(ids, token) {
  return function(dispatch) {
    if (!ids.length) return dispatch({ type: IS_EMPTY });
    dispatch({ type: SEND_ORDER_REQUEST });
    orderFetch(ids, token)
      .then(data => dispatch({ type: SEND_ORDER_SUCCESS, payload: data }))
      .catch(err => {
        console.log(err);
        dispatch({ type: SEND_ORDER_FAILED });
      })
  }
}

export function closeOrderDetails() {
  return { type: CLOSE_ORDER_DETAILS }
}