import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import Form from '../components/form/form';
import { forgotPasswordFormConfig, PASSWORD_RESET_ENDPOINT } from '../utils/data';
import { fetchAuth } from '../utils/api';

import { Outlet } from 'react-router-dom';

import ProfileNavigation from '../components/profile-navigation/profile-navigation';

import profile from './profile.module.css'

export function Profile() {

  return (
    <div className={`${profile[`container`]} mt-30 ml-5`}>
    <ProfileNavigation />
    <Outlet />
    </div>
  );
}