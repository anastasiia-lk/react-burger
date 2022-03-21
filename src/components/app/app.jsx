import {React, useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
  const [ingredients, setIngredients] = useState({
    data: null,
    isLoading: false,
    hasError: false,
  });

  const { data, isLoading, hasError } = ingredients;
  
  useEffect(()=>{
    setIngredients({...ingredients, hasError: false, isLoading: true});
    getIngredients();
  }, []);

  const getIngredients = async() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => res.json())
      .then(data => setIngredients({ ...ingredients, data: data, isLoading: false }))
      .catch(e => {
        setIngredients({ ...ingredients, hasError: true, isLoading: false });
      });
  }

  return (
    <div className={`${appStyles.body} mt-10 mb-10`}>
      <AppHeader />
      {isLoading && "Загрузка ..."}
      {hasError && "Ошибка"}
      {!isLoading && !hasError && data &&
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={data.data}/>
        <BurgerConstructor ingredients={data.data}/>
      </main>
      }
      <Modal>
        <IngredientDetails />
      </Modal>
      {console.log(data)}
    </div>
  );
}

export default App;