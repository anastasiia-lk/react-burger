import {useState, useEffect, useReducer} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import {SERVICE_URL} from '../../utils/data';
import {APIContext, AddsIngredientsContext, BunsIngredientsContext} from '../../services/appContext';

function App() {
  const [ingredients, setIngredients] = useState({
    data: null,
    isLoading: false,
    hasError: false,
  });

  const [ingredientDetailsModal, setIngredientDetailsModal] = useState ({visibility: false})

  const [orderDetailsModal, setOrderDetailsModal] = useState ({visibility: false});

  const [clickedIngredient, setClickedIngredient] = useState ({});

  const { data, isLoading, hasError } = ingredients;

  const [addsIngredients, setAddsIngredients] = useState({data: null});
  const [bunsIngredients, setBunsIngredients] = useState({data: null});

  const [orderNumber, setOrderNumber] = useState(0);
  
  useEffect(()=>{
    setIngredients({...ingredients, hasError: false, isLoading: true});
    getIngredients();
  }, []);

  const getIngredients = async() => {
    fetch(`${SERVICE_URL}/ingredients`)
    .then(res => {
      if (res.ok) {
         return res.json();
     }
     return Promise.reject(res.status);
    })
      .then(data => setIngredients({ ...ingredients, data: data, isLoading: false }))
      .catch(e => {
        setIngredients({ ...ingredients, hasError: true, isLoading: false });
      });
  }

  const orderIngredientsIds = (data) => {
    const idsArray = data.map(item => item._id);
    return idsArray;
  }

  const postOrder = (array) => {
    fetch(`${SERVICE_URL}/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        "ingredients": array
        })  
    }
    )
    .then(res => {
      if (res.ok) {
         return res.json();
     }
     return Promise.reject(res.status);
    })
    .then(data => setOrderNumber({ ...orderNumber, orderNumber: data.order.number }))
    .then(data => setOrderDetailsModal({visibility: true}))
    .catch(e => {
      setOrderNumber({ ...orderNumber, orderNumber: 0 });
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
    const idsArray = orderIngredientsIds(addsIngredients.data);
    postOrder(idsArray);
  }

  return (
    <div className={`${appStyles.body} mt-10 mb-10`}>
      <AppHeader />
      {isLoading && "Загрузка ..."}
      {hasError && "Ошибка"}
      {!isLoading && !hasError && data &&
      <>
      <main className={appStyles.main}>
        <APIContext.Provider value={data.data}>
          <BurgerIngredients openModal={openIngredientsDetailsModal} clickedIngredient={clickedIngredient}/>
          <AddsIngredientsContext.Provider value={{addsIngredients, setAddsIngredients}}>
            <BunsIngredientsContext.Provider value={{bunsIngredients, setBunsIngredients}}>
                <BurgerConstructor openModal={openOrderDetailsModal}/>
            </BunsIngredientsContext.Provider>
          </AddsIngredientsContext.Provider>
        </APIContext.Provider>
      </main>
      { ingredientDetailsModal.visibility &&
        <Modal text='Детали ингредиента' closeModal = {closeIngredientsDetailsModal}>
          <IngredientDetails ingredient = {clickedIngredient}/>
        </Modal>
      }
      { orderDetailsModal.visibility && orderNumber &&
      <Modal text='' closeModal={closeOrderDetailsModal}>
        <OrderDetails order = {orderNumber}/>
      </Modal>
      }
      </>
      }
    </div>
  );
}

export default App;
