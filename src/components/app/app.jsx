import {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import {SERVICE_URL} from '../../utils/data';

function App() {
  const [ingredients, setIngredients] = useState({
    data: null,
    isLoading: false,
    hasError: false,
  });

  const [ingredientDetailsModal, setIngredientDetailsModal] = useState ({visibility: true})

  const [orderDetailsModal, setOrderDetailsModal] = useState ({visibility: false});

  const [clickedIngredient, setClickedIngredient] = useState ({});

  const { data, isLoading, hasError } = ingredients;
  
  useEffect(()=>{
    setIngredients({...ingredients, hasError: false, isLoading: true});
    getIngredients();
  }, []);

  const getIngredients = async() => {
    fetch(SERVICE_URL)
      .then(res => res.json())
      .then(data => setIngredients({ ...ingredients, data: data, isLoading: false }))
      .catch(e => {
        setIngredients({ ...ingredients, hasError: true, isLoading: false });
      });
  }

  const closeIngredientsDetailsModal = () => {
    setIngredientDetailsModal({visibility: false}) 
  }

  const closeOrderDetailsModal = () => {
    setOrderDetailsModal({visibility: false})
  }

  const openIngredientsDetailsModal = (data) => {
    setClickedIngredient(data);
    setIngredientDetailsModal({visibility: true}) 
  }

  const openOrderDetailsModal = () => {
    setOrderDetailsModal({visibility: true});
  }


  return (
    <div className={`${appStyles.body} mt-10 mb-10`}>
      <AppHeader />
      {isLoading && "Загрузка ..."}
      {hasError && "Ошибка"}
      {!isLoading && !hasError && data &&
      <>
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={data.data} openModal={openIngredientsDetailsModal} clickedIngredient={clickedIngredient}/>
        <BurgerConstructor ingredients={data.data} openModal={openOrderDetailsModal}/>
      </main>
      { ingredientDetailsModal.visibility &&
        <Modal text='Детали ингредиента' closeModal = {closeIngredientsDetailsModal}>
          <IngredientDetails ingredient = {clickedIngredient}/>
        </Modal>
      }
      { orderDetailsModal.visibility &&
      <Modal text='' closeModal={closeOrderDetailsModal}>
        <OrderDetails order = '034536'/>
      </Modal>
      }  
      </>
      }
    </div>
  );
}

export default App;
