import {useState, useEffect, useCallback} from 'react';
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
import {closeOrderDetails} from '../../services/actions/order';

import { getUserInfo } from '../../services/actions/user';

import { loadingMessage, errorMessage } from '../../utils/data';

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

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
import { Ingredient } from '../../pages/ingredient';

import ProtectedRoute from '../protected-route/protected-route';
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(()=> {
    dispatch(getIngredients());
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, '');
    }
  }, [location.state?.background])

  const { ingredients, ingredientsRequest, ingredientsFailed, currentIngredients, ingredientDetails, orderNumber, flag, orderNumberRequest, orderNumberFailed } = useSelector(store => store.constructor);

  const background = location.state?.background;
  const isOrderModalShown = useSelector((store) => store.order.isOpen);

  const closeDetailsHandler = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const closeOrderHandler = useCallback(() => {
    dispatch(cleanConstructor());
    dispatch(closeOrderDetails());
  }, [dispatch]);

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
       {ingredientsRequest && loadingMessage }
      {ingredientsFailed && errorMessage }
      {!ingredientsRequest && !ingredientsFailed && ingredients &&
      <div>
      <Routes location={background || location}>
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
          <Route path="orders" element={<div>Лента заказов</div>} />
          <Route path="ingredients/:id" element={<Ingredient />} />
        </Route>  
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal closeModal={closeDetailsHandler}>
                <IngredientDetails isModal />
              </Modal>
            }
          />
        </Routes>
      )}
      {isOrderModalShown && (
          <Modal closeModal={closeOrderHandler}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    }
      {/* { flag.visibility && orderNumber &&
      <Modal text='' closeModal={closeOrderDetailsModal}>
        <OrderDetails order = {orderNumber.number}/>
      </Modal>
      } */}
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
