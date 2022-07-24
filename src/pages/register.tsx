import { useState, useMemo, useCallback } from 'react';
import { useAppDispatch } from '../services/hooks';

import CustomInput from '../components/custom-input/custom-input';

import Form from '../components/form/form';
import { registerFormConfig } from '../utils/data';

import { registerUser } from '../services/thunks/user';

export function Register() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const dispatch = useAppDispatch();

  const body = useMemo(() => ({
    name: nameValue,
    email: emailValue,
    password: passwordValue
  }), [nameValue, emailValue, passwordValue]);

  const onSubmitHandler = useCallback(
    (e, body) => {
      e.preventDefault();
      dispatch(registerUser(body));
    },
    [dispatch]
  );

  return (
    <Form 
      config={registerFormConfig}
      body={body}
      onSubmit={onSubmitHandler}
    >
      <CustomInput 
        type = {`${registerFormConfig.inputsArr[0].type}`}
        placeholder = {`${registerFormConfig.inputsArr[0].placeholder}`}
        icon = {`${registerFormConfig.inputsArr[0].icon}`}
        name = {`${registerFormConfig.inputsArr[0].name}`}
        value = { nameValue }
        setValue={setNameValue}
      />
      <CustomInput 
        type = {`${registerFormConfig.inputsArr[1].type}`}
        placeholder = {`${registerFormConfig.inputsArr[1].placeholder}`}
        icon = {`${registerFormConfig.inputsArr[1].icon}`}
        name = {`${registerFormConfig.inputsArr[1].name}`}
        value = { emailValue }
        setValue={setEmailValue}
      />
      <CustomInput 
        type = {`${registerFormConfig.inputsArr[2].type}`}
        placeholder = {`${registerFormConfig.inputsArr[2].placeholder}`}
        icon = {`${registerFormConfig.inputsArr[2].icon}`}
        name = {`${registerFormConfig.inputsArr[2].name}`}
        value = { passwordValue }
        setValue={setPasswordValue}
      />
    </Form>
  );
}