import {
  CLOSE_ORDER_DETAILS,
  IS_EMPTY,
  SEND_ORDER_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
} from '../action-types';
import { IOrder } from '../types/data';

export interface ISendOrderRequestAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly payload: IOrder;
}

export interface ISendOrderFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}

export interface IIsOrderEmptyAction {
  readonly type: typeof IS_EMPTY;
}

export interface ICloseOrderDetailsAction {
  readonly type: typeof CLOSE_ORDER_DETAILS;
}

export type TOrderActions =
  | ISendOrderRequestAction
  | ISendOrderSuccessAction
  | ISendOrderFailedAction
  | IIsOrderEmptyAction
  | ICloseOrderDetailsAction;

export const sendOrderRequestAction = (): ISendOrderRequestAction => {
  return {
    type: SEND_ORDER_REQUEST,
  };
};

export const sendOrderSuccessAction = (
  payload: IOrder
): ISendOrderSuccessAction => {
  return {
    type: SEND_ORDER_SUCCESS,
    payload,
  };
};

export const sendOrderFailedAction = (): ISendOrderFailedAction => {
  return {
    type: SEND_ORDER_FAILED,
  };
};

export const isOrderEmptyAction = (): IIsOrderEmptyAction => {
  return {
    type: IS_EMPTY,
  };
};

export const closeOrderDetailsAction = (): ICloseOrderDetailsAction => {
  return {
    type: CLOSE_ORDER_DETAILS,
  };
};