import OrdersList from '../orders-list/orders-list';
import ordersHistory from './orders-history.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loadingMessage} from '../../utils/data';
import { wsAuthConnectionStart, wsAuthClose } from '../../services/actions/wsAuthActions';

export default function OrdersHistory() {
  const dispatch = useDispatch();
  const { orders } = useSelector(store => store.wsAuth.orders);
  useEffect(() => {
    dispatch(wsAuthConnectionStart());

    return () => dispatch(wsAuthClose());
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