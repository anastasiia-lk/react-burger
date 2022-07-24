import { IOrder } from '../../services/types/data';

export interface IOrdersListProps {
  orders: IOrder[];
  to: string;
  isUser?: boolean;
}