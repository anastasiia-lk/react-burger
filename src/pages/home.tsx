import {useState, FC} from 'react';
import { useAppSelector, useAppDispatch } from '../services/hooks'
import { IIngredient } from '../services/types/data';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import homeStyles from './home.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

import { loadingMessage, errorMessage } from '../utils/data';

export const Home: FC = () => {

  const { ingredients, ingredientsRequest, ingredientsFailed, currentIngredients} = useAppSelector(store => store.constructor);

  // const [setIngredientDetailsModal] = useState ({visibility: false});

  // const openIngredientsDetailsModal = (data: IIngredient) => {
  //   dispatch(setIngredientDetails(data));
  //   setIngredientDetailsModal({ visibility: true }) 
  // }

  // const openOrderDetailsModal = () => {
  //   dispatch(postOrder(currentIngredients));
  // }
  return (
    <div className={`${homeStyles.body} mt-10 mb-10`}>
  {ingredientsRequest && loadingMessage }
  {ingredientsFailed && errorMessage }
  {!ingredientsRequest && !ingredientsFailed && ingredients &&
  <div className={homeStyles.main}>
      <DndProvider backend={HTML5Backend}>
        {/* <BurgerIngredients openModal={openIngredientsDetailsModal}/>
        <BurgerConstructor openModal={openOrderDetailsModal} /> */}
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
  </div>}
  </div>
  )
}