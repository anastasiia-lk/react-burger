import {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import appStyles from './app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import { getIngredients, cleanConstructor } from '../../services/actions/index';
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
import { Feed } from '../../pages/feed'
import {OrderInfoPage} from '../../pages/order-details';
import {ProfileOrdersHistory} from '../../pages/profile-orders-history';

import ProtectedRoute from '../protected-route/protected-route';
import OrderInfo from '../order-info/order-info';

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

  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.constructor);

  const background = location.state?.background;
  const isOrderModalShown = useSelector((store) => store.order.isOpen);

  const closeDetailsHandler = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const closeOrderHandler = useCallback(() => {
    dispatch(cleanConstructor());
    dispatch(closeOrderDetails());
  }, [dispatch]);

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
            <Route path="orders" element={<ProfileOrdersHistory />} />
          </Route>
          <Route path="orders" element={<div>Лента заказов</div>} />
          <Route path="profile/orders/:id" element={<OrderInfoPage />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:id" element={<div>Лента заказов</div>} />
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
           <Route
            path="/feed/:id"
            element={
              <Modal closeModal={closeDetailsHandler}>
                <OrderInfo isModal />
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
    </div>
  );
}

export default App;
