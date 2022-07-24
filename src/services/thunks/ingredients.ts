import { SERVICE_URL } from '../../utils/data';
import {
  getIngredientsFailedAction,
  getIngredientsRequestAction,
  getIngredientsSuccessAction,
  checkResponse
} from '../actions';
import { AppDispatch, AppThunk } from '../types';

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequestAction());
    fetch(`${SERVICE_URL}/ingredients`)
    .then(checkResponse)
    .then((json) => dispatch(getIngredientsSuccessAction(json.data)))
    .catch((err) => {
      console.log(err);
      dispatch(getIngredientsFailedAction());
    });
    }
}