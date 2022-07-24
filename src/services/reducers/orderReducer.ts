import {
  IS_EMPTY,
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  CLOSE_ORDER_DETAILS,
} from '../action-types';
import { TOrderActions } from '../actions/order';
import { IOrder } from '../types/data';

type TOrderDetailsState = {
  order: IOrder | null;
  request: boolean;
  failed: boolean;
  isEmpty: boolean;
};

const initialState: TOrderDetailsState = {
  order: null,
  request: false,
  failed: false,
  isEmpty: true,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderDetailsState => {
  switch (action.type) {
    case SEND_ORDER_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        isEmpty: false,
      };

    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        request: false,
        isEmpty: false,
      };

    case SEND_ORDER_FAILED:
      return {
        ...state,
        order: null,
        failed: true,
        request: false,
      };

    case IS_EMPTY:
      return {
        ...state,
        isEmpty: true,
      };

    case CLOSE_ORDER_DETAILS:
      return {
        ...state,
        order: null,
        isEmpty: true,
      };

    default:
      return state;
  }
};