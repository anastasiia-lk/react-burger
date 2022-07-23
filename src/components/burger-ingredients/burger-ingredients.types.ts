import { IIngredient } from "../../services/types/data";

export type TPriceEl = {
  price: number | undefined
};

export type TIngrCard = {
  ingredient: IIngredient | null
}

export type TIngrTypes = {
  ingredientsType: Array<IIngredient>;
}

export type TIngrBlock = {
  text: string,
  ingredientType: string, ingredients: Array<IIngredient>, typeRef: any
}