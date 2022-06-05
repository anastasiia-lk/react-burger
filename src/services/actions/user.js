import { REGISTRATION_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from "../../utils/data";
import { fetchAuth } from "../../utils/api";
import { saveTokens } from '../../utils/utils';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';

export function registerUser(body) {
  return function (dispatch) {
    fetchAuth(REGISTRATION_ENDPOINT, body)
      .then((data) => {
        if (data.success) {
          dispatch({ type: USER_REGISTRATION, payload: data.user });
        }
        return data;
      })
      .then(saveTokens)
      .catch((err) => console.log(err));
  };
}

export function signInUser(body) {
  return function (dispatch) {
    fetchAuth(LOGIN_ENDPOINT, body)
      .then((data) => {
        if (data.success) {
          dispatch({ type: USER_SIGN_IN, payload: data.user });
        }
        return data;
      })
      .then(saveTokens)
      .catch((err) => console.log(err));
  };
}

export function signOutUser() {
  const refreshToken = localStorage.getItem('refreshToken');
  return function (dispatch) {
    fetchAuth(LOGOUT_ENDPOINT, { token: refreshToken })
      .then((data) => {
        if (data.success) {
          dispatch({ type: USER_SIGN_OUT });
        }
      })
      .catch((err) => console.log(err));
  };
}