import { TRootState } from '../types/index';
export const getOrders = (store: TRootState) => store.ws.orders;
export const getUserOrders = (store: TRootState) => store.wsAuth.orders;