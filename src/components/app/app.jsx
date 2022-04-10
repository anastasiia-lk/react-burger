import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import { APIContext } from '../../services/appContext';

import { getIngredients, postOrder, GET_INGREDIENT_DETAILS, REMOVE_FLAG, REMOVE_INGREDIENT_DETAILS } from '../../services/actions/index';

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients, ingredientsRequest, ingredientsFailed, currentIngredients, ingredientDetails, orderNumber, flag } = useSelector(store => store.constructor);

  const [ingredientDetailsModal, setIngredientDetailsModal] = useState ({visibility: false});

  const closeIngredientsDetailsModal = () => {
    dispatch({
      type: REMOVE_INGREDIENT_DETAILS,
      value: {}
    });
    setIngredientDetailsModal({visibility: false});
  }

  const closeOrderDetailsModal = () => {
    dispatch({
      type: REMOVE_FLAG
    });
  }

  const openIngredientsDetailsModal = (data) => {
    dispatch({
      type: GET_INGREDIENT_DETAILS,
      value: data
    });
    setIngredientDetailsModal({ visibility: true }) 
  }

  const openOrderDetailsModal = () => {
    dispatch(postOrder(currentIngredients));
  }

  return (
    <div className={`${appStyles.body} mt-10 mb-10`}>
      <AppHeader />
      {ingredientsRequest && "Загрузка ..."}
      {ingredientsFailed && "Ошибка"}
      {!ingredientsRequest && !ingredientsFailed && ingredients &&
      <>
      <main className={appStyles.main}>
        <APIContext.Provider value={ingredients}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModal={openIngredientsDetailsModal}/>
            <BurgerConstructor openModal={openOrderDetailsModal} />
          </DndProvider>
        </APIContext.Provider>
      </main>
      { ingredientDetailsModal.visibility &&
        <Modal text='Детали ингредиента' closeModal = {closeIngredientsDetailsModal}>
          <IngredientDetails ingredient = {ingredientDetails}/>
        </Modal>
      }
      { flag.visibility && orderNumber &&
      <Modal text='' closeModal={closeOrderDetailsModal}>
        {console.log(typeof(orderNumber.number))}
        <OrderDetails order = {orderNumber.number}/>
      </Modal>
      }
      </>
      }
    </div>
  );
}

export default App;
