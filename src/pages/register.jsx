import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Form from '../components/form/form';
import { registerFormConfig } from '../utils/data';

export function Register() {
  return (
    <Form config={registerFormConfig}>
    </Form>
  );
}