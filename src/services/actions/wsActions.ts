import {
  WS_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from '../action-types';
import { IOrdersResponse } from '../types/data';

interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

interface IWsCloseAction {
  readonly type: typeof WS_CLOSE;
}

interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWsGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: IOrdersResponse;
}

export type TWsActions =
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetOrdersAction
  | IWsConnectionStartAction
  | IWsCloseAction;

  export interface IWsOptions {
    readonly wsInit: typeof WS_CONNECTION_START;
    readonly onOpen: typeof WS_CONNECTION_SUCCESS;
    readonly onClose: typeof WS_CONNECTION_CLOSED;
    readonly onError: typeof WS_CONNECTION_ERROR;
    readonly onMessage: typeof WS_GET_ORDERS;
    readonly wsClose: typeof WS_CLOSE;
  };

  export const wsConnectionStartAction = (): IWsConnectionStartAction => {
    return {
      type: WS_CONNECTION_START
    };
  };
  
  export const wsCloseAction = (): IWsCloseAction => {
    return {
      type: WS_CLOSE
    };
  };

  export const wsOptions: IWsOptions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_ORDERS,
    wsClose: WS_CLOSE,
  };