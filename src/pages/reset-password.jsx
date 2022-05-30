import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/form/form';
import { resetPasswordFormConfig } from '../utils/data';

export function ResetPassword() {
  return (
    <Form config={resetPasswordFormConfig}>
    </Form>
  );
}