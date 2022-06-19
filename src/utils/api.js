import { errorMessage, SERVICE_URL, TOKEN_ERR_MESSAGE, REFRESH_TOKEN_ENDPOINT, ORDERS_ENDPOINT } from "./data";

import { saveTokens } from './utils';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${errorMessage}: ${res.status}`);
}

export function fetchAuth(url, body) {
  return fetch(`${SERVICE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(checkResponse);
}

function updateTokens() {
  const refreshToken = localStorage.getItem('refreshToken');
  return fetchAuth(REFRESH_TOKEN_ENDPOINT, {
    token: refreshToken,
  })
    .then(data => {
      console.log(data);
      if (!data.success) {
        return Promise.reject(data);
      }
      saveTokens(data);
      return data;
    })
}

export async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === TOKEN_ERR_MESSAGE) {
      const refreshData = await updateTokens();
      options.headers.Authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export function orderFetch(ids, token) {
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