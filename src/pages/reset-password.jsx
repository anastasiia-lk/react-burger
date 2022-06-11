import { useState, useEffect } from 'react';
import CustomInput from '../components/custom-input/custom-input';

import Form from '../components/form/form';
import { resetPasswordFormConfig, PASSWORD_RESET_CONFIRM_ENDPOINT } from '../utils/data';
import { fetchAuth } from '../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';

export function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [passwordValue, setPasswordValue] = useState('');
  const [tokenValue, setTokenValue] = useState(' ');

  const from = location.state?.from?.pathname;

  useEffect(() => {
    if (from !== '/forgot-password') {
      navigate('/forgot-password', { replace: true });
    }
  }, [from, navigate]);

  const onSubmitHandler = (event, body) => {
    event.preventDefault();

    fetchAuth(PASSWORD_RESET_CONFIRM_ENDPOINT, body)
    .then((data) => {
      if (data.success) {
        navigate('/login', { replace: true });
      }
    })
    .catch((err) => console.log(err));
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
      <CustomInput 
        type = {`${resetPasswordFormConfig.inputsArr[0].type}`}
        placeholder = {`${resetPasswordFormConfig.inputsArr[0].placeholder}`}
        icon = {`${resetPasswordFormConfig.inputsArr[0].icon}`}
        name = {`${resetPasswordFormConfig.inputsArr[0].name}`}
        value = { passwordValue }
        setValue={setPasswordValue}
      />
      <CustomInput 
        type = {`${resetPasswordFormConfig.inputsArr[1].type}`}
        placeholder = {`${resetPasswordFormConfig.inputsArr[1].placeholder}`}
        name = {`${resetPasswordFormConfig.inputsArr[1].name}`}
        value = { tokenValue }
        setValue={setTokenValue}
      />
    </Form>
  );
}