import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/form/form';
import { loginFormConfig } from '../utils/data';

export function Login() {
  return (
    <Form config={loginFormConfig}>
    </Form>
  );
}