import { v4 as uuidv4 } from 'uuid';
import { addIngredient, increaseIngredientCounter } from '../actions';
import { AppDispatch, AppThunk } from '../types';

export const addIngredientThunk: AppThunk = (ingredient) => {
  return (dispatch: AppDispatch, getState) => {
    const constructorIngredients = getState().constructor.draggedIngredients;
    const keyId = uuidv4();
    const payload = [
      ...constructorIngredients,
      {
        ...ingredient,
        key: keyId, 
        index: ++[...constructorIngredients].length
      }
    ]
    dispatch(addIngredient(payload));
    console.log(payload);
  }
}