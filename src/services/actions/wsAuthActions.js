export const WS_AUTH_CONNECTION_START = 'WS_AUTH_CONNECTION_START';
export const WS_AUTH_CLOSE = 'WS_AUTH_CLOSE';
export const WS_AUTH_CONNECTION_SUCCESS ='WS_AUTH_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_AUTH_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_AUTH_ORDERS = 'GET_AUTH_ORDERS';

export const wsAuthConnectionStart = () => {
  return {
    type: WS_AUTH_CONNECTION_START
  };
};

export const wsAuthClose = () => {
  return {
    type: WS_AUTH_CLOSE
  };
};