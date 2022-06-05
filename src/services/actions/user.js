import { REGISTRATION_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, SERVICE_URL, USER_ENDPOINT } from "../../utils/data";
import { fetchAuth, fetchWithRefresh } from "../../utils/api";
import { saveTokens, getCookie } from '../../utils/utils';

export const USER_SIGN_IN = 'USER_SIGN_IN';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';
export const USER_UPDATE_USER_REQUEST = 'USER_UPDATE_USER_REQUEST';
export const USER_UPDATE_USER_SUCCESS = 'USER_UPDATE_USER_SUCCESS';
export const USER_GET_USER_REQUEST ='USER_GET_USER_REQUEST';
export const USER_GET_USER_SUCCESS = 'USER_GET_USER_SUCCESS';

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

export function updateUserInfo(body, setFn) {
  const accessToken = getCookie('token');
  return function (dispatch) {
    dispatch({ type: USER_UPDATE_USER_REQUEST });
    fetchWithRefresh(`${SERVICE_URL}${USER_ENDPOINT}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })
    .then((data) => {
      if (data.success) {
        dispatch({ type: USER_UPDATE_USER_SUCCESS, payload: data.user });
      }
    })
    .then(() => setFn(false))
    .catch((err) => {
      console.log(err);
    });
  };
}

export function getUserInfo() {
  const accessToken = getCookie('token');
  return function (dispatch) {
    dispatch({ type: USER_GET_USER_REQUEST });
    fetchWithRefresh(`${SERVICE_URL}${USER_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => {
        if (data.success) {
          dispatch({ type: USER_GET_USER_SUCCESS, payload: data.user });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}