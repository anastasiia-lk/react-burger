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