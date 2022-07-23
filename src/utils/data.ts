import PropTypes from 'prop-types';

export const ESC_KEY = "Escape";
export const INGREDIENT_PROP_TYPE = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
});
export const SERVICE_URL = 'https://norma.nomoreparties.space/api';
export const PASSWORD_RESET_ENDPOINT = '/password-reset';
export const PASSWORD_RESET_CONFIRM_ENDPOINT = '/password-reset/reset';
export const LOGIN_ENDPOINT = '/auth/login';
export const REGISTRATION_ENDPOINT = '/auth/register';
export const LOGOUT_ENDPOINT = '/auth/logout';
export const REFRESH_TOKEN_ENDPOINT = '/auth/token';
export const USER_ENDPOINT = '/auth/user';

export const SCROLL_MARGIN = 340;
export const loadingMessage = "Загрузка ...";
export const errorMessage = "Ошибка";
export const TOKEN_ERR_MESSAGE = 'jwt malformed';

export const ORDERS_ENDPOINT = '/orders';

export const SHOW_ICON = 'ShowIcon';
export const HIDE_ICON = 'HideIcon';
export const PASSWORD = 'password';
export const TEXT = 'text';
export const EMAIL = 'email';

export const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
export const wsAuthUrl = 'wss://norma.nomoreparties.space/orders';

export const MONTH_TO_DAY = 1000 * 60 * 60 * 24;

type TInput = {
  type: typeof EMAIL | typeof PASSWORD | typeof TEXT;
  placeholder: 'Имя'
  | 'E-mail'
  | 'Пароль'
  | 'Укажите e-mail'
  | 'Введите новый пароль'
  | 'Введите код из письма'
  | 'Логин'
  icon?: string,
  name: 'name' | 'email' | 'password' | 'reset-token' | 'code',
  value?: string
}

type TSub = {
  id: number,
  text: string,
  linkText: string
}

type TNav = string[]

type TLoginConfig = {
  readonly header: string,
  readonly buttonText: string,
  inputsArr: TInput[],
  subtitleArr: TSub[]
}

type TNavConfig = {
  inputsArr: TInput[],
  navigationArr: TNav
}

type TFormConfig = TLoginConfig | TNavConfig

export const loginFormConfig: TLoginConfig = {
  header: 'Вход',
  buttonText: 'Войти',
  inputsArr: [
    {
      type: EMAIL,
      placeholder: 'E-mail',
      icon: '',
      name: 'email'
    },
    {
      type: PASSWORD,
      placeholder: 'Пароль',
      icon: 'ShowIcon',
      name: 'password',
    }
  ],
  subtitleArr: [
    { 
      id: 1,
      text: 'Вы — новый пользователь?',
      linkText: 'Зарегистрироваться'
    },
    {
      id: 2,
      text: 'Забыли пароль?',
      linkText: 'Восстановить пароль'
    }
  ]
}

export const registerFormConfig: TLoginConfig = {
  header: 'Регистрация',
  buttonText: 'Зарегестрироваться',
  inputsArr: [
    {
      type: TEXT,
      placeholder: 'Имя',
      icon: '',
      name: 'name'
    },
    {
      type: EMAIL,
      placeholder: 'E-mail',
      icon: '',
      name: 'email'
    },
    {
      type: PASSWORD,
      placeholder: 'Пароль',
      icon: 'ShowIcon',
      name: 'password',
    }
  ],
  subtitleArr: [
    { 
      id: 1,
      text: 'Уже зарегистрированы?',
      linkText: 'Войти'
    }
  ]
}

export const forgotPasswordFormConfig: TLoginConfig = {
  header: 'Восстановление пароля',
  buttonText: 'Восстановить',
  inputsArr: [
    {
      type: EMAIL,
      placeholder: 'Укажите e-mail',
      icon: '',
      name: 'email',
      value: ''
    }
  ],
  subtitleArr: [
    {
      id: 1,
      text: 'Вспомнили пароль?',
      linkText: 'Войти'
    }
  ]
}

export const resetPasswordFormConfig: TLoginConfig = {
  header: 'Восстановление пароля',
  buttonText: 'Сохранить',
  inputsArr: [
    {
      type: PASSWORD,
      placeholder: 'Пароль',
      icon: 'ShowIcon',
      name: 'password',
    },
    {
      type: TEXT,
      placeholder: 'Введите код из письма',
      name: 'code',
    },
  ],
  subtitleArr: [
    { 
      id: 1,
      text: 'Вспомнили пароль?',
      linkText: 'Войти'
    }
  ]
}

export const profileFormConfig: TNavConfig = {
  inputsArr: [
    {
      type: TEXT,
      placeholder: 'Имя',
      icon: 'EditIcon',
      name: 'name',
    },
    {
      type: EMAIL,
      placeholder: 'Логин',
      icon: 'EditIcon',
      name: 'email',
    },
    {
      type: PASSWORD,
      placeholder: 'Пароль',
      icon: 'EditIcon',
      name: 'password',
    }
  ],
  navigationArr: [
    'Профиль',
    'История заказов',
    'Выход'
  ]
}
