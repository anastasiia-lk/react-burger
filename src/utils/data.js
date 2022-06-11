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

export const loginFormConfig = {
  header: 'Вход',
  buttonText: 'Войти',
  inputsArr: [
    {
      type: 'email',
      placeholder: 'E-mail',
      icon: '',
      name: 'email'
    },
    {
      type: 'password',
      placeholder: 'Пароль',
      icon: 'ShowIcon',
      name: 'password',
    }
  ],
  subtitleArr: [
    {
      text: 'Вы — новый пользователь?',
      linkText: 'Зарегистрироваться'
    },
    {
      text: 'Забыли пароль?',
      linkText: 'Восстановить пароль'
    }
  ]
}

export const registerFormConfig = {
  header: 'Регистрация',
  buttonText: 'Зарегестрироваться',
  inputsArr: [
    {
      type: 'text',
      placeholder: 'Имя',
      icon: '',
      name: 'name'
    },
    {
      type: 'email',
      placeholder: 'E-mail',
      icon: '',
      name: 'email'
    },
    {
      type: 'password',
      placeholder: 'Пароль',
      icon: 'ShowIcon',
      name: 'password',
    }
  ],
  subtitleArr: [
    {
      text: 'Уже зарегистрированы?',
      linkText: 'Войти'
    }
  ]
}

export const forgotPasswordFormConfig = {
  header: 'Восстановление пароля',
  buttonText: 'Восстановить',
  inputsArr: [
    {
      type: 'email',
      placeholder: 'Укажите e-mail',
      icon: '',
      name: 'email',
      value: ''
    }
  ],
  subtitleArr: [
    {
      text: 'Вспомнили пароль?',
      linkText: 'Войти'
    }
  ]
}

export const resetPasswordFormConfig = {
  header: 'Восстановление пароля',
  buttonText: 'Сохранить',
  inputsArr: [
    {
      type: 'password',
      placeholder: 'Пароль',
      icon: 'ShowIcon',
      name: 'password',
    },
    {
      type: 'text',
      placeholder: 'Введите код из письма',
      name: 'code',
    },
  ],
  subtitleArr: [
    {
      text: 'Вспомнили пароль?',
      linkText: 'Войти'
    }
  ]
}

export const profileFormConfig = {
  inputsArr: [
    {
      type: 'text',
      placeholder: 'Имя',
      icon: 'EditIcon',
      name: 'name',
    },
    {
      type: 'email',
      placeholder: 'Логин',
      icon: 'EditIcon',
      name: 'email',
    },
    {
      type: 'password',
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
