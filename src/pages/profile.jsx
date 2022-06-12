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