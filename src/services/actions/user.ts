import {
  USER_GET_USER_REQUEST,
  USER_GET_USER_SUCCESS,
  USER_REGISTRATION,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../action-types';
import { IUser } from '../types/data';

export interface IGetUserRequestAction {
  readonly type: typeof USER_GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof USER_GET_USER_SUCCESS;
  readonly payload: IUser;
}

export interface ISignInUserAction {
  readonly type: typeof USER_SIGN_IN;
  readonly payload: IUser;
}

export interface ISignOutAction {
  readonly type: typeof USER_SIGN_OUT;
}

export interface IRegistrationUserAction {
  readonly type: typeof USER_REGISTRATION;
  readonly payload: IUser;
}

export interface IUserUpdateRequestAction {
  readonly type: typeof USER_UPDATE_REQUEST;
}

export interface IUserUpdateSuccessAction {
  readonly type: typeof USER_UPDATE_SUCCESS;
  readonly payload: IUser;
}

export type TUserActions =
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | ISignInUserAction
  | ISignOutAction
  | IRegistrationUserAction
  | IUserUpdateRequestAction
  | IUserUpdateSuccessAction;

export const getUserRequestAction = (): IGetUserRequestAction => {
  return {
    type: USER_GET_USER_REQUEST,
  };
};

export const getUserSuccessAction = (payload: IUser): IGetUserSuccessAction => {
  return {
    type: USER_GET_USER_SUCCESS,
    payload,
  };
};

export const signInUserAction = (payload: IUser): ISignInUserAction => {
  return {
    type: USER_SIGN_IN,
    payload,
  };
};

export const signOutUserAction = (): ISignOutAction => {
  return {
    type: USER_SIGN_OUT,
  };
};

export const registrationUserAction = (
  payload: IUser
): IRegistrationUserAction => {
  return {
    type: USER_REGISTRATION,
    payload,
  };
};

export const userUpdateRequestAction = (): IUserUpdateRequestAction => {
  return {
    type: USER_UPDATE_REQUEST,
  };
};

export const userUpdateSuccessAction = (
  payload: IUser
): IUserUpdateSuccessAction => {
  return {
    type: USER_UPDATE_SUCCESS,
    payload,
  };
};