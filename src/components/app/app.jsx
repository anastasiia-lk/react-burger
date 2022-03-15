import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

function App() {
  return (
    <body className={`${appStyles.body} mt-10 mb-10`}>
      <AppHeader />
      <main style = {{display: 'flex', justifyContent: 'space-between', width: '100%', margin: 'auto'}}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </body>
  );
}

export default App;