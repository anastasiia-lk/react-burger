import { useState, useMemo, useCallback } from 'react';
import { useAppDispatch } from '../services/hooks';

import CustomInput from '../components/custom-input/custom-input';

import Form from '../components/form/form';
import { loginFormConfig } from '../utils/data';

import { signInUserThunk } from '../services/thunks/user';

export function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const dispatch = useAppDispatch();

  const body = useMemo(() => ({
    email: emailValue,
    password: passwordValue
  }), [emailValue, passwordValue])

  const onSubmitHandler = useCallback(
    (e, body) => {
      e.preventDefault();
      dispatch(signInUserThunk(body))
    },
    [dispatch],
  )

  return (
    <Form 
      config={loginFormConfig}
      body={body}
      onSubmit={onSubmitHandler}
    >
    <CustomInput 
      type = {`${loginFormConfig.inputsArr[0].type}`}
      placeholder = {`${loginFormConfig.inputsArr[0].placeholder}`}
      icon = {`${loginFormConfig.inputsArr[0].icon}`}
      name = {`${loginFormConfig.inputsArr[0].name}`}
      value = { emailValue }
      setValue={setEmailValue}
    />
    <CustomInput 
      type = {`${loginFormConfig.inputsArr[1].type}`}
      placeholder = {`${loginFormConfig.inputsArr[1].placeholder}`}
      icon = {`${loginFormConfig.inputsArr[1].icon}`}
      name = {`${loginFormConfig.inputsArr[1].name}`}
      value = { passwordValue }
      setValue={setPasswordValue}
    />
    </Form>
  );
}