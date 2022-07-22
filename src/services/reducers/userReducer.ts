import {
  USER_REGISTRATION,
  USER_GET_USER_REQUEST,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_GET_USER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../action-types';
import { TUserActions } from '../actions/user';
import { IUser } from '../types/data';

type TUserState = {
  isRequest: boolean;
  isAuth: boolean;
  user: IUser | null;
};

const initialState: TUserState = {
  isRequest: false,
  isAuth: false,
  user: null,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case USER_GET_USER_REQUEST:
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        isRequest: true,
      };

    case USER_SIGN_IN:
    case USER_REGISTRATION:
    case USER_GET_USER_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        isRequest: false,
      };

    case USER_SIGN_OUT:
      return {
        ...state,
        isAuth: false,
        user: null,
      };

    default:
      return state;
  }
};