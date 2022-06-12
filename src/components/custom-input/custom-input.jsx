import { PASSWORD, SHOW_ICON, HIDE_ICON, TEXT } from '../../utils/data';
import React, { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export default function CustomInput({
  name,
  type,
  placeholder,
  value,
  setValue,
  icon = false,
}) {
  const [inputType, setInputType] = useState({
    icon: SHOW_ICON,
    type: PASSWORD,
  });

  const onIconClickHandler= (setFn) => {
    setFn((prev) => {
        return {
          icon: prev.type === PASSWORD ? HIDE_ICON : SHOW_ICON,
          type: prev.type === PASSWORD ? TEXT : PASSWORD,
        };
    });
  }
  
  const inputOnChangeHandler = (e, setFn) => {
    setFn(e.target.value);
  }

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