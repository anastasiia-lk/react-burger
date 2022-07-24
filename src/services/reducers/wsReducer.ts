import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from '../action-types';
import { TWsActions } from '../actions/wsActions';
import { IOrdersResponse } from '../types/data';

type TWsState = {
  wsConnected: boolean;
  orders: IOrdersResponse;
};

const initialState: TWsState = {
  wsConnected: false,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        orders: { ...action.payload },
      };

    default:
      return state;
  }
};