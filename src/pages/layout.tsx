import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';

import styles from './layout.module.css';

export const Layout: FC = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}