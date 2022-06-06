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

import { getIngredients, postOrder, setIngredientDetails,removeIngredientDetails, cleanConstructor } from '../../services/actions/index';

import { loadingMessage, errorMessage } from '../../utils/data';

import { Route, Routes } from "react-router-dom";

import {
  Layout
} from '../../pages/layout';
import { Home } from '../../pages/home';
import {
  Login
} from '../../pages/login';
import {
  Register
} from '../../pages/register';
import {
  ForgotPassword
} from '../../pages/forgot-password';
import { 
  ResetPassword
} from '../../pages/reset-password';
import { 
  Profile
} from '../../pages/profile';
import ProfileForm from '../../components/profile-form/profile-form';

import ProtectedRoute from '../protected-route/protected-route';
function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredients, ingredientsRequest, ingredientsFailed, currentIngredients, ingredientDetails, orderNumber, flag, orderNumberRequest, orderNumberFailed } = useSelector(store => store.constructor);

  const [ingredientDetailsModal, setIngredientDetailsModal] = useState ({visibility: false});

  const closeIngredientsDetailsModal = () => {
    dispatch(removeIngredientDetails({}));
    setIngredientDetailsModal({visibility: false});
  }

  const closeOrderDetailsModal = () => {
    dispatch(cleanConstructor());
  }

  const openIngredientsDetailsModal = (data) => {
    dispatch(setIngredientDetails(data));
    setIngredientDetailsModal({ visibility: true }) 
  }

  const openOrderDetailsModal = () => {
    dispatch(postOrder(currentIngredients));
  }

  return (
    <div className={`${appStyles.body} mt-10 mb-10`}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Home />}
          />
          <Route path="login" element={
            <ProtectedRoute anonymous>
              <Login />
            </ProtectedRoute>
          }/>
          <Route path="register" element={
            <ProtectedRoute anonymous>
                <Register />
              </ProtectedRoute>
          }/>
          <Route path="forgot-password" element={
            <ProtectedRoute anonymous>
              <ForgotPassword />
            </ProtectedRoute>
          }/>
          <Route path="reset-password" element={
            <ProtectedRoute anonymous>
              <ResetPassword />
            </ProtectedRoute>
          }/>
          <Route path="profile" element={ 
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>}>
            <Route index element={<ProfileForm />} />
          </Route>
        </Route>  
      </Routes>
      {/* <AppHeader />
      {ingredientsRequest && loadingMessage }
      {ingredientsFailed && errorMessage }
      {!ingredientsRequest && !ingredientsFailed && ingredients &&
      <>
      <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModal={openIngredientsDetailsModal}/>
            <BurgerConstructor openModal={openOrderDetailsModal} />
          </DndProvider>
      </main>
      { ingredientDetailsModal.visibility &&
        <Modal text='Детали ингредиента' closeModal = {closeIngredientsDetailsModal}>
          <IngredientDetails ingredient = {ingredientDetails}/>
        </Modal>
      }
      { orderNumberRequest && loadingMessage }
      { orderNumberFailed && errorMessage }
      { flag.visibility && orderNumber &&
      <Modal text='' closeModal={closeOrderDetailsModal}>
        <OrderDetails order = {orderNumber.number}/>
      </Modal>
      }
      </>
      } */}
    </div>
  );
}

export default App;
