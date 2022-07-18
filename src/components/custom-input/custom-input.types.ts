import { EMAIL, PASSWORD, SHOW_ICON, HIDE_ICON, TEXT } from '../../utils/data';

type TFormInputName = 'name' | 'email' | 'password' | 'reset-token';
type TFormInputType = typeof EMAIL | typeof PASSWORD | typeof TEXT;
type TFormInputPlaceholder =
  | 'Имя'
  | 'E-mail'
  | 'Пароль'
  | 'Укажите e-mail'
  | 'Введите новый пароль'
  | 'Введите код из письма';

export type TCustomInputState = {
  icon: typeof SHOW_ICON | typeof HIDE_ICON;
  type: typeof PASSWORD | typeof TEXT;
};

export interface ICustomInputProps {
  name: TFormInputName;
  type: TFormInputType;
  placeholder: TFormInputPlaceholder;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  icon?: boolean;
}

export type TCustomInputOnChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFn: React.Dispatch<React.SetStateAction<string>>
) => void;

export type TCustomInputOnIconClickHandler = (
  setFn: React.Dispatch<React.SetStateAction<TCustomInputState>>
) => void;