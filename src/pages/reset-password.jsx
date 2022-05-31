import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';
import { resetPasswordFormConfig, PASSWORD_RESET_CONFIRM_ENDPOINT } from '../utils/data';
import { fetchAuth } from '../utils/api';

export function ResetPassword() {
  const [passwordValue, setPasswordValue] = useState('');
  const [tokenValue, setTokenValue] = useState(' ');
  const onSubmitHandler = (event, body) => {
    event.preventDefault();

    fetchAuth(PASSWORD_RESET_CONFIRM_ENDPOINT, body)
  }
  return (
  <Form 
      config={resetPasswordFormConfig}
      onSubmit={onSubmitHandler}
      body={
        {
        password: passwordValue,
        token: tokenValue
        }
      }
    >
      <Input 
        type = {`${resetPasswordFormConfig.inputsArr[0].type}`}
        placeholder = {`${resetPasswordFormConfig.inputsArr[0].placeholder}`}
        icon = {`${resetPasswordFormConfig.inputsArr[0].icon}`}
        name = {`${resetPasswordFormConfig.inputsArr[0].name}`}
        value = { passwordValue }
        onChange={e => setPasswordValue(e.target.value)}
      />
      <Input 
        type = {`${resetPasswordFormConfig.inputsArr[1].type}`}
        placeholder = {`${resetPasswordFormConfig.inputsArr[1].placeholder}`}
        name = {`${resetPasswordFormConfig.inputsArr[1].name}`}
        value = { tokenValue }
        onChange={e => setTokenValue(e.target.value)}
      />
    </Form>
  );
}