import { IIngredient } from '../../services/types/data';

export interface IOrderInfoProps {
  isModal?: boolean;
}

export interface IIngredientWithCount extends IIngredient {
  count: number;
}