import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';

function App() {
  return (
    <div className={appStyles.body}>
      <AppHeader />
      <BurgerIngredients />
    </div>
  );
}

export default App;