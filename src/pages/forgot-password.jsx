import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';
import { forgotPasswordFormConfig, PASSWORD_RESET_ENDPOINT } from '../utils/data';
import { fetchAuth } from '../utils/api';

export function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('');
  const onSubmitHandler = (event, body) => {
    event.preventDefault();

    fetchAuth(PASSWORD_RESET_ENDPOINT, body)
  }
  return (
    <Form 
      config={forgotPasswordFormConfig}
      onSubmit={onSubmitHandler}
      body={{email: emailValue}}
    >
      <Input 
        type = {`${forgotPasswordFormConfig.inputsArr[0].type}`}
        placeholder = {`${forgotPasswordFormConfig.inputsArr[0].placeholder}`}
        icon = {`${forgotPasswordFormConfig.inputsArr[0].icon}`}
        name = {`${forgotPasswordFormConfig.inputsArr[0].name}`}
        value = { emailValue }
        onChange={e => setEmailValue(e.target.value)}
      />
    </Form>
  );
}