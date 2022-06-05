export function setCookie(name, value, options = {}) {
  let { expires } = options;

  if (typeof expires === 'number' && expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 1000);
    expires = options.expires = date;
  }

  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  name = encodeURIComponent(name);
  value = encodeURIComponent(value);

  let updatedCookie = `${name}=${value}`;

  for (const key in options) {
    updatedCookie += `; ${key}`;
    const optionValue = options[key];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function saveTokens(data) {
  localStorage.setItem('refreshToken', data.refreshToken);
  const accessToken = data.accessToken.split('Bearer ')[1];
  if (accessToken) {
    setCookie('token', accessToken, { path: '/', 'max-age': 1200 });
  }
}

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}