type TOrderStatus = 'created' | 'pending' | 'done';

export interface IOrder {
  readonly _id: string;
  readonly ingredients: string[];
  readonly status: TOrderStatus;
  readonly name: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface IOrdersResponse {
  readonly orders: Array<IOrder>;
  readonly total: number;
  readonly totalToday: number;
}

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  keyId?: number;
  qty?: number;
  key?: number;
  index: number;
}

export interface IUser {
  readonly name: string;
  readonly email: string;
}

export interface ITotalOrders {
  readonly title: string;
  readonly totalOrders: number;
}

export interface IOrderCard {
  readonly order: IOrder;
  readonly isUser: boolean;
}

interface ISuccess {
  readonly success: boolean;
}

export interface IUser {
  readonly name: string;
  readonly email: string;
}

export interface ITokenResponse extends ISuccess {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IAuthResponse extends ITokenResponse {
  readonly user: IUser;
}

export interface ILogOut extends ISuccess {
  readonly message: string;
}