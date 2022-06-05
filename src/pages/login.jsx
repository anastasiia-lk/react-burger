import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';
import { loginFormConfig } from '../utils/data';

import { signInUser } from '../services/actions/user';

export function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const dispatch = useDispatch();

  const body = useMemo(() => ({
    email: emailValue,
    password: passwordValue
  }), [emailValue, passwordValue])

  const onSubmitHandler = useCallback(
    (e, body) => {
      e.preventDefault();
      dispatch(signInUser(body))
    },
    [dispatch],
  )

  return (
    <Form 
      config={loginFormConfig}
      body={body}
      onSubmit={onSubmitHandler}
    >
    <Input 
      type = {`${loginFormConfig.inputsArr[0].type}`}
      placeholder = {`${loginFormConfig.inputsArr[0].placeholder}`}
      icon = {`${loginFormConfig.inputsArr[0].icon}`}
      name = {`${loginFormConfig.inputsArr[0].name}`}
      value = { emailValue }
      onChange={e => setEmailValue(e.target.value)}
    />
    <Input 
      type = {`${loginFormConfig.inputsArr[1].type}`}
      placeholder = {`${loginFormConfig.inputsArr[1].placeholder}`}
      icon = {`${loginFormConfig.inputsArr[1].icon}`}
      name = {`${loginFormConfig.inputsArr[1].name}`}
      value = { passwordValue }
      onChange={e => setPasswordValue(e.target.value)}
    />
    </Form>
  );
}