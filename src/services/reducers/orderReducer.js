import {
  IS_EMPTY,
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  CLOSE_ORDER_DETAILS,
} from '../actions/order.js';

const initialState = {
  order: {},
  request: false,
  failed: false,
  isEmpty: true,
  isOpen: false,
}

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEND_ORDER_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        isEmpty: false,
        isOpen: true,
      }

    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        order: payload,
        request: false,
        isEmpty: false,
      }

    case SEND_ORDER_FAILED:
      return {
        ...state,
        order: {},
        failed: true,
        request: false,
      }

    case IS_EMPTY:
      return {
        ...state,
        isEmpty: true,
        isOpen: true,
      }

    case CLOSE_ORDER_DETAILS:
      return {
        ...state,
        order: {},
        isEmpty: true,
        isOpen: false,
      }

    default:
      return state;
  }
}