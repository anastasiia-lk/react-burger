import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';

function App() {
  return (
    <div className={appStyles.body}>
      <AppHeader />
    </div>
  );
}

export default App;