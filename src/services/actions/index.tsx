import { SERVICE_URL } from "../../utils/data";
import { v4 as uuidv4 } from 'uuid';
import { orderFetch } from "../../utils/api";
import { IIngredient } from '../types/data';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENT_DETAILS,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  SET_FLAG,
  REMOVE_FLAG,
  UPDATE_INGREDIENTS,
  ADD_DRAGGED_INGREDIENTS,
  REMOVE_DRAGGED_INGREDIENTS,
  ADD_INGREDIENT_COUNTER,
  REMOVE_INGREDIENT_COUNTER,
  INIT_INGREDIENTS_COUNTER,
  UPDATE_BUN_INGREDIENT,
  ADD_BUN_COUNTER,
  BURGER_REPLACE_INGREDIENTS,
  REMOVE_INGREDIENT_DETAILS
} from '../action-types';

// export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
// export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
// export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

// export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';

// export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
// export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
// export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

// export const SET_FLAG = 'SET_FLAG';
// export const REMOVE_FLAG = 'REMOVE_FLAG';

// export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';

// export const ADD_DRAGGED_INGREDIENTS = 'ADD_DRAGGED_INGREDIENTS';

// export const REMOVE_DRAGGED_INGREDIENTS = 'REMOVE_DRAGGED_INGREDIENTS';

// export const ADD_INGREDIENT_COUNTER = 'ADD_INGREDIENT_COUNTER';
// export const REMOVE_INGREDIENT_COUNTER = 'REMOVE_INGREDIENT_COUNTER';

// export const  INIT_INGREDIENTS_COUNTER = 'INIT_INGREDIENTS_COUNTER';

// export const UPDATE_BUN_INGREDIENT = 'UPDATE_BUN_INGREDIENT';

// export const ADD_BUN_COUNTER = 'ADD_BUN_COUNTER';

// export const BURGER_REPLACE_INGREDIENTS = 'BURGER_REPLACE_INGREDIENTS';

// export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';


export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status)
}

// export function addIngredient(ingredient) {
//   return function(dispatch, getState) {
//     const constructorIngredients = getState().constructor.draggedIngredients;
//     const keyId = uuidv4();
//     const payload = [
//       ...constructorIngredients,
//       {
//         ...ingredient,
//         key: keyId, 
//         index: ++[...constructorIngredients].length
//       }
//     ]
//     dispatch({ type: ADD_DRAGGED_INGREDIENTS, payload });
//     console.log(payload);
//   }
// }
export interface IAddIngredientAction {
  readonly type: typeof ADD_DRAGGED_INGREDIENTS;
  readonly payload: any;
}

export const addIngredient = (
  payload: any
): IAddIngredientAction => {
  return { type: ADD_DRAGGED_INGREDIENTS, payload };
};

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<IIngredient>;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

export const getIngredientsSuccessAction = (
  payload: Array<IIngredient>
): IGetIngredientsSuccessAction => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload,
  };
};

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};

// export function getIngredients() {
//   return function(dispatch) {
//     dispatch({
//       type: GET_INGREDIENTS_REQUEST
//     });
//     fetch(`${SERVICE_URL}/ingredients`)
//     .then(checkResponse)
//     .then (res => {
//       return res.data
//     })
//     .then(res => {
//       if (res) {
//         dispatch ({
//           type: GET_INGREDIENTS_SUCCESS,
//           ingredients: res,
//         })
//       } else {
//         dispatch ({
//           type: GET_INGREDIENTS_FAILED,
//         })
//       }})
//       .catch((err) => {
//         console.log(err)
//       })
//     }
// }

// export function postOrder(ingredientsArray: any) {
//   return function(dispatch: any) {
//     dispatch({
//       type: POST_ORDER_REQUEST
//     });
//     fetch(`${SERVICE_URL}/orders`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//       },
//       body: JSON.stringify({
//         "ingredients": ingredientsArray
//         })  
//     }
//     )
//     .then(checkResponse)
//     .then (res => {
//       return res.order
//     })
//     .then(res => {
//       if (res) {
//         dispatch ({
//           type: POST_ORDER_SUCCESS,
//           orderNumber: res,
//         })
//       } else {
//         dispatch ({
//           type: POST_ORDER_FAILED,
//         })
//       }})
//     .then (res => {
//       dispatch ({
//         type: SET_FLAG
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   }
// }

export interface IRemoveIngredientDetails {
  readonly type: typeof REMOVE_INGREDIENT_DETAILS;
  readonly value: IIngredient;
}

export const removeIngredientDetails = (value: IIngredient): IRemoveIngredientDetails => {
  return { type: REMOVE_INGREDIENT_DETAILS, value }
}

export interface ISetIngredientDetails {
  readonly type: typeof GET_INGREDIENT_DETAILS;
  readonly value: IIngredient;
}

export const setIngredientDetails = (value: IIngredient): ISetIngredientDetails =>  {
  return { type: GET_INGREDIENT_DETAILS, value }
}

export interface ICleanConstructor {
  readonly type: typeof REMOVE_FLAG ;
}

export const cleanConstructor = (): ICleanConstructor => {
  return { type: REMOVE_FLAG }
}

export interface IUpdateBun {
  readonly type: typeof  UPDATE_BUN_INGREDIENT;
  readonly value: IIngredient;
}

export const updateBun = (value: IIngredient):IUpdateBun =>  {
  return { type: UPDATE_BUN_INGREDIENT, value }
}

export interface IIncreaseBunCounter {
  readonly type: typeof ADD_BUN_COUNTER;
  readonly value: IIngredient;
}

export const increaseBunCounter = (value: IIngredient): IIncreaseBunCounter => {
  return { type: ADD_BUN_COUNTER, value }
}

export interface IIncreaseIngredientCounter {
  readonly type: typeof ADD_INGREDIENT_COUNTER;
  readonly value: Array<IIngredient>;
}

export const increaseIngredientCounter = (value: Array<IIngredient>):IIncreaseIngredientCounter => {
  return { type: ADD_INGREDIENT_COUNTER, value }
}

export interface IDecreaseIngredientCounter {
  readonly type: typeof REMOVE_INGREDIENT_COUNTER;
  readonly value: IIngredient;
}

export const decreaseIngredientCounter = (value: IIngredient): IDecreaseIngredientCounter => {
  return { type: REMOVE_INGREDIENT_COUNTER, value }
}

export interface ISortConstructorIngredients {
  readonly type: typeof BURGER_REPLACE_INGREDIENTS;
  readonly selected: any;
  readonly target: any;
}

export const sortConstructorIngredients = (selected: any, target: any): ISortConstructorIngredients => {
  return { type: BURGER_REPLACE_INGREDIENTS, selected, target } 
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_DRAGGED_INGREDIENTS;
  readonly value: IIngredient;
}

export const removeIngredient = (value: IIngredient):IRemoveIngredient => {
  return { type: REMOVE_DRAGGED_INGREDIENTS, value }
}

export interface IUpdateIngredients {
  readonly type: typeof  UPDATE_INGREDIENTS;
  readonly value: string;
}

export const updateIngredient = (value: string):IUpdateIngredients => {
  return { type: UPDATE_INGREDIENTS, value }
}

export interface IInitIngredientsCounter {
  readonly type: typeof  INIT_INGREDIENTS_COUNTER;
}

export const initIngredientsCounter = ():IInitIngredientsCounter => {
  return { type: INIT_INGREDIENTS_COUNTER }
}

export type TConstructorActions =
  | IRemoveIngredient
  | ISortConstructorIngredients
  | IDecreaseIngredientCounter
  | IIncreaseIngredientCounter
  | IIncreaseBunCounter
  | IUpdateBun
  | ICleanConstructor
  | ISetIngredientDetails
  | IRemoveIngredientDetails
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IUpdateIngredients
  | IInitIngredientsCounter
  | IAddIngredientAction
  | ICleanConstructor