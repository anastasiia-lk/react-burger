import { Outlet } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';

import styles from './layout.module.css';

export function Layout() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}