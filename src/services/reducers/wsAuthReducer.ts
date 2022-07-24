import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_GET_AUTH_ORDERS,
} from '../action-types';
import { TWsAuthActions } from '../actions/wsAuthActions';
import { IOrdersResponse } from '../types/data';

type TWsAuthState = {
  wsAuthConnected: boolean;
  orders: IOrdersResponse;
};

const initialState: TWsAuthState = {
  wsAuthConnected: false,
  orders:  {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsAuthReducer = (
  state = initialState,
  action: TWsAuthActions
): TWsAuthState => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsAuthConnected: true,
      };

    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsAuthConnected: false,
      };

    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        wsAuthConnected: false,
      };

    case WS_GET_AUTH_ORDERS:
      return {
        ...state,
        orders: { ...action.payload },
      };

    default:
      return state;
  }
};