import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/form/form';
import { forgotPasswordFormConfig } from '../utils/data';

export function ForgotPassword() {
  return (
    <Form config={forgotPasswordFormConfig}>
    </Form>
  );
}