import { IIngredient } from '../../services/types/data';

export interface IBurgerConstructorIngredientCard {
  item?: IIngredient;
  index: number;
}

export interface ICollect {
  isOver: boolean;
}

export interface ICollectt {
  isHover: boolean;
}

export interface IDragObj {
  item: IIngredient
}

export interface IDragObjj {
  ingredient: IIngredient
}