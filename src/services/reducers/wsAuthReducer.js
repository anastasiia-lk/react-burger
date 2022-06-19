import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_GET_AUTH_ORDERS,
} from '../actions/wsAuthActions';

const initialState = {
  wsAuthConnected: false,
  orders: {},
};

export function wsAuthReducer(state = initialState, { type, payload }) {
  switch (type) {
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
        orders: {...payload},
      }

    default:
      return state;
  }
}