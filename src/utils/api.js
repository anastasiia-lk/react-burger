import { errorMessage, SERVICE_URL } from "./data";

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