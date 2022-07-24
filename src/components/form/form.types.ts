import { ReactChild } from 'react';
import { FormEvent } from 'react';
import {EMAIL, PASSWORD, TEXT} from '../../utils/data'

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

type TFormTitle = 'Регистрация' | 'Вход' | 'Восстановление пароля' | 'Восстановление пароля';
type TFormBodyKey = 'name' | 'password' | 'email' | 'token';
type TFormButtonText = 'Зарегистрироваться' | 'Войти' | 'Восстановить' | 'Сохранить';
type TFormText = 'Уже зарегистрированы?' | 'Вы — новый пользователь?' | 'Вспомнили пароль?';
export type TFormBody = { [key in TFormBodyKey]?: string }

export type TOnSubmitHandler = (event: FormEvent<HTMLFormElement>, body: TFormBody) => void;

export interface IFormProps {
  config: TLoginConfig,
  // title: TFormTitle;
  body: TFormBody;
  // buttonText: TFormButtonText;
  onSubmit: TOnSubmitHandler;
  // text: TFormText;
  // link: '/login' | '/register';
  // linkText: 'Войти' | 'Зарегистрироваться';
  // isLoginPage?: boolean;
  children: Array<React.ReactNode> | React.ReactNode
}