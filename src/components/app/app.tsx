import {useEffect, useCallback, FC} from 'react';

import appStyles from './app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import { getIngredients } from '../../services/thunks/ingredients';

import { getUserInfo } from '../../services/thunks';

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
import ProfileForm from '../profile-form/profile-form';
import { Ingredient } from '../../pages/ingredient';
import { Feed } from '../../pages/feed'
import {OrderInfoPage} from '../../pages/order-details';
import {ProfileOrdersHistory} from '../../pages/profile-orders-history';

import ProtectedRoute from '../protected-route/protected-route';
import OrderInfo from '../order-info/order-info';

import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { TCloseModalCallback, TLocationState } from './app.types';
import { closeOrderDetailsAction } from '../../services/actions/order';
import { cleanConstructor } from '../../services/actions/index';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation() as TLocationState;
  const navigate = useNavigate();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (background) {
      window.history.replaceState({}, '');
    }
  }, [background]);

  const { ingredients, ingredientsRequest, ingredientsFailed } = useAppSelector(store => store.constructor);

  const closeModalHandler = useCallback<TCloseModalCallback>(() => {
    navigate(-1);
  }, [navigate]);

  const closeOrderHandler = useCallback<TCloseModalCallback>(() => {
    closeModalHandler();
    dispatch(closeOrderDetailsAction());
    dispatch(cleanConstructor());
  }, [dispatch, closeModalHandler]);

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
          <Route path="profile/orders/:id" element={<OrderInfoPage />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:id" element={<OrderInfoPage />} />
          <Route path="ingredients/:id" element={<Ingredient />} />
        </Route>  
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal closeModal={closeModalHandler}>
                <IngredientDetails isModal />
              </Modal>
            }
          />
           <Route
            path="/feed/:id"
            element={
              <Modal closeModal={closeModalHandler}>
                <OrderInfo isModal />
              </Modal>
            }
          />
            <Route
            path="/profile/orders/:id"
            element={
              <Modal closeModal={closeModalHandler}>
                <OrderInfo isModal />
              </Modal>
            }
          />
                    <Route
            path="/order-details"
            element={
              <Modal closeModal={closeOrderHandler}>
                <OrderDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      </div>
    }
    </div>
  );
}

export default App;
