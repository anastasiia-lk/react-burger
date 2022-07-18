import { PASSWORD, SHOW_ICON, HIDE_ICON, TEXT } from '../../utils/data';
import { useState, FC } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  ICustomInputProps,
  TCustomInputOnChangeHandler,
  TCustomInputOnIconClickHandler,
  TCustomInputState,
} from './custom-input.types';

const CustomInput: FC<ICustomInputProps> = ({
  name,
  type,
  placeholder,
  value,
  setValue,
  icon = false,
}) => {
  const [inputType, setInputType] = useState<TCustomInputState>({
    icon: SHOW_ICON,
    type: PASSWORD,
  });

  const onIconClickHandler: TCustomInputOnIconClickHandler = (setFn) => {
    setFn((prev) => {
      return {
        icon: prev.type === PASSWORD ? HIDE_ICON : SHOW_ICON,
        type: prev.type === PASSWORD ? TEXT : PASSWORD,
      };
    });
  };
  
  const inputOnChangeHandler: TCustomInputOnChangeHandler = (e, setFn) => {
    setFn(e.target.value);
  };

  return (
    <div className="mb-6">
      <Input
        name={name}
        type={type === PASSWORD ? inputType.type : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => inputOnChangeHandler(e, setValue)}
        icon={icon ? inputType.icon : undefined}
        onIconClick={() => onIconClickHandler(setInputType)}
      />
    </div>
  );
}

export default CustomInput;