import {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import {SERVICE_URL} from '../../utils/data';
import {APIContext} from '../../services/appContext';

import { useSelector } from 'react-redux';
import { getIngredients, postOrder } from '../../services/actions/index';
import { useDispatch } from 'react-redux';

import {GET_INGREDIENT_DETAILS, REMOVE_FLAG} from '../../services/actions/index';

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch]);

  const { ingredients, ingredientsRequest, ingredientsFailed, currentIngredients, ingredientDetails, orderNumber, flag } = useSelector(store => store.constructor);

  const [ingredientDetailsModal, setIngredientDetailsModal] = useState ({visibility: false})

  // const [orderDetailsModal, setOrderDetailsModal] = useState ({visibility: false});

  // const [orderNumber, setOrderNumber] = useState(0);

  // const orderIngredientsIds = (data) => {
  //   const idsArray = data.map(item => item._id);
  //   return idsArray;
  // }

  // const postOrder = (array) => {
  //   fetch(`${SERVICE_URL}/orders`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json; charset=UTF-8'
  //     },
  //     body: JSON.stringify({
  //       "ingredients": array
  //       })  
  //   }
  //   )
  //   .then(res => {
  //     if (res.ok) {
  //        return res.json();
  //    }
  //    return Promise.reject(res.status);
  //   })
  //   .then(data => setOrderNumber({ ...orderNumber, orderNumber: data.order.number }))
  //   .then(data => setOrderDetailsModal({visibility: true}))
  //   .catch(e => {
  //     setOrderNumber({ ...orderNumber, orderNumber: 0 });
  //   });
  // }

  const closeIngredientsDetailsModal = () => {
    setIngredientDetailsModal({visibility: false}) 
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
    setIngredientDetailsModal({visibility: true}) 
  }

  const openOrderDetailsModal = () => {
    dispatch(postOrder(currentIngredients));
    console.log(orderNumber);
      // .then(res => setOrderDetailsModal({visibility: true}))
    // setOrderDetailsModal({visibility: true}); 
  }

  // useEffect(()=> {
  //   dispatch(postOrder(currentIngredients));
  // }, [openOrderDetailsModal]);

  return (
    <div className={`${appStyles.body} mt-10 mb-10`}>
      <AppHeader />
      {ingredientsRequest && "Загрузка ..."}
      {ingredientsFailed && "Ошибка"}
      {!ingredientsRequest && !ingredientsFailed && ingredients &&
      <>
      <main className={appStyles.main}>
        <APIContext.Provider value={ingredients}>
          <BurgerIngredients openModal={openIngredientsDetailsModal}/>
          <BurgerConstructor openModal={openOrderDetailsModal} adds={currentIngredients} buns={ingredients[0]}/>
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
