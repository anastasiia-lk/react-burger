import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import data from '../../utils/data.js';

function App() {
  return (
    <div className={`${appStyles.body} mt-10 mb-10`}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={data}/>
        <BurgerConstructor ingredients={data}/>
      </main>
    </div>
  );
}

export default App;