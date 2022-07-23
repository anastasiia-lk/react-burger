import { MONTH_TO_DAY } from './data';
import { ITokenResponse } from '../services/types/data';

export function setCookie(
  name: string,
  value: string,
  options: {[key: string]: number | Date | string | true} | undefined
) {
  let expires = options?.expires;

  if (options && typeof expires !== 'undefined') {
    if (typeof expires === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + expires * 1000);
      expires = options.expires = date;
    }
    if (expires instanceof Date) {
      options.expires = expires.toUTCString();
    }
  }

  name = encodeURIComponent(name);
  value = encodeURIComponent(value);

  let updatedCookie = `${name}=${value}`;

  for (let key in options) {
    updatedCookie += `; ${key}`;
    const optionValue = options[key];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function saveTokens(data: ITokenResponse) {
  localStorage.setItem('refreshToken', data.refreshToken);
  const accessToken = data.accessToken.split('Bearer ')[1];
  if (accessToken) {
    setCookie('token', accessToken, { path: '/' });
  }
}

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getOrderStatus = (status: string) => {
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

const getDaysDiff = (orderDateISOString: string) => {
  const today = new Date();
  const todayISOstring = today.toISOString();
  const slicedTodayISOString = todayISOstring.slice(0, 10);
  const slicedOrderDateISOString = orderDateISOString.slice(0, 10);
  const parsedToday = Date.parse(slicedTodayISOString);
  const parsedOrderDate = Date.parse(slicedOrderDateISOString);

  const daysDiff = (parsedToday - parsedOrderDate) / MONTH_TO_DAY;

  return daysDiff;
};

const formatDaysDiff = (num: number) => {
  if (num === 0) return 'Сегодня';
  if (num === 1) return 'Вчера';
  return num <= 4 ? `${num} дня назад` : `${num} дней назад`;
};

export const getTimeStampString = (orderDateISOString: string) => {
  const date = new Date(orderDateISOString);
  const daysDiff = getDaysDiff(orderDateISOString);
  const formatedDaysDiff = formatDaysDiff(daysDiff);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursToString = hours <= 9 ? `0${hours}` : `${hours}`;
  const minutesToString = minutes <= 9 ? `0${minutes}` : `${minutes}`;
  const timeZone = Math.abs(date.getTimezoneOffset() / 60);

  return `${formatedDaysDiff}, ${hoursToString}:${minutesToString} i-GMT+${timeZone}`;
};