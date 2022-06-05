import { USER_SIGN_IN, USER_REGISTRATION, USER_SIGN_OUT } from '../actions/user';

const initialState = {
  isRequest: false,
  isAuth: false,
  user: null,
};

export function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_SIGN_IN:
    case USER_REGISTRATION:
    case USER_SIGN_OUT:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
}