import {
  isOrderEmptyAction,
  sendOrderFailedAction,
  sendOrderRequestAction,
  sendOrderSuccessAction,
} from '../actions/order';
import { orderFetch } from '../../utils/api';
import { AppDispatch, AppThunk } from '../types';

export const sendOrder: AppThunk = (ids, token) => {
  return function (dispatch: AppDispatch) {
    if (!ids.length) return dispatch(isOrderEmptyAction());
    dispatch(sendOrderRequestAction());
    orderFetch(ids, token)
      .then((data) => dispatch(sendOrderSuccessAction(data)))
      .catch((err) => {
        console.log(err);
        dispatch(sendOrderFailedAction());
      });
  };
}