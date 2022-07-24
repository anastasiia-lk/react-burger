import { errorMessage, SERVICE_URL, TOKEN_ERR_MESSAGE, REFRESH_TOKEN_ENDPOINT, ORDERS_ENDPOINT } from "./data";

import { saveTokens } from './utils';
import { ITokenResponse } from '../services/types/data';

export async function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(await res.json());
}

export function fetchAuth(endpoint: string, body: object) {
  return fetch(`${SERVICE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(checkResponse);
}

function updateTokens(): Promise<ITokenResponse> {
  const refreshToken = localStorage.getItem('refreshToken');
  return fetchAuth(REFRESH_TOKEN_ENDPOINT, {
    token: refreshToken,
  })
    .then(data => {
      if (!data.success) {
        return Promise.reject(data);
      }
      saveTokens(data);
      return data;
    })
    .catch(err => console.log(err));
}

export async function fetchWithRefresh(url: string, options: RequestInit) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    console.log(err.message);
    if (err.message === errorMessage) {
      const refreshData = await updateTokens();
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      }
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export function orderFetch(ids: string[], token: string) {
  return fetch(`${SERVICE_URL}${ORDERS_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      ingredients: ids,
    }),
  }).then(checkResponse);
}