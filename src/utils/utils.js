import { MONTH_TO_DAY } from './data';

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

export const formatOrderNumber = (n) => {
  return n.toString().padStart(6, '0');
};

export const getOrderStatus = (status) => {
  switch (status) {
    case 'created':
      return 'Создан';

    case 'pending':
      return 'Готовится';

    case 'done':
      return 'Выполнен';
  
    default:
      return '';
  }
};

const getDaysDiff = (orderDateISOString) => {
  const today = new Date();
  const todayISOstring = today.toISOString();
  const slicedTodayISOString = todayISOstring.slice(0, 10);
  const slicedOrderDateISOString = orderDateISOString.slice(0, 10);
  const parsedToday = Date.parse(slicedTodayISOString);
  const parsedOrderDate = Date.parse(slicedOrderDateISOString);

  const daysDiff = (parsedToday - parsedOrderDate) / MONTH_TO_DAY;

  return daysDiff;
}

const formatDaysDiff = (num) => {
  if (num === 0) return 'Сегодня';
  if (num === 1) return 'Вчера';
  return num <= 4 ? `${num} дня назад` : `${num} дней назад`;
}

export const getTimeStampString = (orderDateISOString) => {
  const date = new Date(orderDateISOString);
  const daysDiff = getDaysDiff(orderDateISOString);
  const formatedDaysDiff = formatDaysDiff(daysDiff);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursToString = hours <= 9 ? `0${hours}` : `${hours}`;
  const minutesToString = minutes <= 9 ? `0${minutes}` : `${minutes}`;
  const timeZone = Math.abs(date.getTimezoneOffset() / 60);
  
  return `${formatedDaysDiff}, ${hoursToString}:${minutesToString} i-GMT+${timeZone}`;
}