import {
  WS_AUTH_CLOSE,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_GET_AUTH_ORDERS,
} from '../action-types';
import { IOrdersResponse } from '../types/data';

interface IWsAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
}

interface IWsAuthCloseAction {
  readonly type: typeof WS_AUTH_CLOSE;
}

interface IWsAuthConnectionSuccessAction {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

interface IWsAuthConnectionErrorAction {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
}

interface IWsAuthConnectionClosedAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}

interface IWsAuthGetOrdersAction {
  readonly type: typeof WS_GET_AUTH_ORDERS;
  readonly payload: IOrdersResponse;
}

export interface IWsAuthOptions {
  readonly wsInit: typeof WS_AUTH_CONNECTION_START;
  readonly onOpen: typeof WS_AUTH_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_AUTH_CONNECTION_CLOSED;
  readonly onError: typeof WS_AUTH_CONNECTION_ERROR;
  readonly onMessage: typeof WS_GET_AUTH_ORDERS;
  readonly wsClose: typeof WS_AUTH_CLOSE;
};

export type TWsAuthActions = 
  | IWsAuthConnectionSuccessAction
  | IWsAuthConnectionErrorAction
  | IWsAuthConnectionClosedAction
  | IWsAuthGetOrdersAction
  | IWsAuthConnectionStartAction
  | IWsAuthCloseAction

export const wsAuthConnectionStartAction = (): IWsAuthConnectionStartAction => {
  return {
    type: WS_AUTH_CONNECTION_START
  };
};

export const wsAuthCloseAction = (): IWsAuthCloseAction => {
  return {
    type: WS_AUTH_CLOSE
  };
};

export const wsAuthOptions: IWsAuthOptions = {
  wsInit: WS_AUTH_CONNECTION_START,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_GET_AUTH_ORDERS,
  wsClose: WS_AUTH_CLOSE,
};