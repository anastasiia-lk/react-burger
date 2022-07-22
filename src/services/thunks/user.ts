import { fetchAuth, fetchWithRefresh } from '../../utils/api';
import {
  SERVICE_URL,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTRATION_ENDPOINT,
  USER_ENDPOINT,
} from '../../utils/data';
import { getCookie, saveTokens } from '../../utils/utils';
import {
  getUserRequestAction,
  getUserSuccessAction,
  registrationUserAction,
  signInUserAction,
  signOutUserAction,
  userUpdateRequestAction,
  userUpdateSuccessAction,
} from '../actions/user';
import { AppDispatch, AppThunk } from '../types';

export const registerUser: AppThunk = (body) => {
  return function (dispatch: AppDispatch) {
    fetchAuth(REGISTRATION_ENDPOINT, body)
      .then((data) => {
        if (data.success) {
          dispatch(registrationUserAction(data.user));
        }
        return data;
      })
      .then(saveTokens)
      .catch((err) => console.log(err));
  };
}

export const signInUserThunk: AppThunk = (body) => {
  return function (dispatch: AppDispatch) {
    fetchAuth(LOGIN_ENDPOINT, body)
      .then((data) => {
        if (data.success) {
          dispatch(signInUserAction(data.user));
        }
        return data;
      })
      .then(saveTokens)
      .catch((err) => console.log(err));
  };
}

export const signOutUserThunk: AppThunk = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return function (dispatch: AppDispatch) {
    fetchAuth(LOGOUT_ENDPOINT, { token: refreshToken })
      .then((data) => {
        if (data.success) {
          dispatch(signOutUserAction());
        }
      })
      .catch((err) => console.log(err));
  };
}

export const getUserInfo: AppThunk = () => {
  const accessToken = getCookie('token');
  return function (dispatch: AppDispatch) {
    dispatch(getUserRequestAction());
    fetchWithRefresh(`${SERVICE_URL}${USER_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => {
        if (data.success) {
          dispatch(getUserSuccessAction(data.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const updateUserInfoThunk: AppThunk = (body, setFn) => {
  const accessToken = getCookie('token');
  return function (dispatch: AppDispatch) {
    dispatch(userUpdateRequestAction());
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
          dispatch(userUpdateSuccessAction(data.user));
        }
      })
      .then(() => setFn(false))
      .catch((err) => {
        console.log(err);
      });
  };
}