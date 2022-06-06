import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import homeStyles from './home.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

import { loadingMessage, errorMessage } from '../utils/data';

import { getIngredients, postOrder, setIngredientDetails,removeIngredientDetails, cleanConstructor } from '../services/actions/index';

export function Home() {
  const dispatch = useDispatch();

  const { ingredients, ingredientsRequest, ingredientsFailed, currentIngredients, ingredientDetails, orderNumber, flag, orderNumberRequest, orderNumberFailed } = useSelector(store => store.constructor);

  const [ingredientDetailsModal, setIngredientDetailsModal] = useState ({visibility: false});

  const openIngredientsDetailsModal = (data) => {
    dispatch(setIngredientDetails(data));
    setIngredientDetailsModal({ visibility: true }) 
  }

  const openOrderDetailsModal = () => {
    dispatch(postOrder(currentIngredients));
  }
  return (
    <div className={`${homeStyles.body} mt-10 mb-10`}>
  {ingredientsRequest && loadingMessage }
  {ingredientsFailed && errorMessage }
  {!ingredientsRequest && !ingredientsFailed && ingredients &&
  <div className={homeStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients openModal={openIngredientsDetailsModal}/>
        <BurgerConstructor openModal={openOrderDetailsModal} />
      </DndProvider>
  </div>}
  </div>
  )
}