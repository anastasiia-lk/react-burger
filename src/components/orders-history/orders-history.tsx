import OrdersList from '../orders-list/orders-list';
import ordersHistory from './orders-history.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loadingMessage} from '../../utils/data';
import { wsAuthConnectionStartAction, wsAuthCloseAction } from '../../services/actions/wsAuthActions';
import { useAppDispatch, useAppSelector } from '../../services/hooks';


export default function OrdersHistory() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(store => store.wsAuth.orders);
  useEffect(() => {
    dispatch(wsAuthConnectionStartAction());

    return () => dispatch(wsAuthCloseAction()) as any;;
  }, [dispatch]);

  if (!orders) return (
    <div>
      {loadingMessage}
    </div>
  );
  return (
    <div className={`${ordersHistory.container} custom-scroll`}>
      <OrdersList orders={orders} to="profile/orders" isUser />
    </div>
  );
}