import { USER_SIGN_IN, USER_REGISTRATION, USER_SIGN_OUT, USER_UPDATE_USER_REQUEST, USER_UPDATE_USER_SUCCESS, USER_GET_USER_REQUEST, USER_GET_USER_SUCCESS } from '../actions/user';

const initialState = {
  isRequest: false,
  isAuth: false,
  user: null,
};

export function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_GET_USER_REQUEST:
    case USER_UPDATE_USER_REQUEST:
      return {
        ...state,
        isRequest: true,
      };
    
    case USER_SIGN_IN:
      return {
        ...state,
        isAuth: true,
        user: payload,
      };
    case USER_REGISTRATION:
    case USER_SIGN_OUT:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    
    case USER_UPDATE_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: payload,
        isRequest: false,
      };
    case USER_GET_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: payload,
      };
    default:
      return state;
  }
}