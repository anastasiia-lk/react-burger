import feedConstructorStyles from './feed-constructor.module.css';
import {Link, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import OrdersList from '../orders-list/orders-list';
import React, { useEffect, useMemo } from 'react';
import { wsCloseAction, wsConnectionStartAction } from '../../services/actions/wsActions';
import { loadingMessage } from '../../utils/data';
import { formatOrderNumber } from '../../utils/utils';
import OrdersNumbersList from '../orders-numbers-list/orders-numbers-list'
import TotalOrders from '../total-orders/total-orders'

export default function FeedConstructor() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(store => store.ws.orders);
  const location = useLocation();

  useEffect(() => {
    dispatch(wsConnectionStartAction());

    return () => {
      dispatch(wsCloseAction());
    };
  }, [dispatch]);

  const doneOrdersNumbers = useMemo(() => {
    return orders
      ? orders
          .filter((order) => order.status === 'done')
          .map((order) => order.number)
          .slice(0, 10)
      : null;
  }, [orders]);

  const inWorkOrdersNumbers = useMemo(() => {
    return orders
      ? orders
          .filter((order) => order.status !== 'done')
          .map((order) => order.number)
          .slice(0, 10)
      : null;
  }, [orders]);

  if (!orders) return (<div>{loadingMessage}</div>);

  return (
    <div className={feedConstructorStyles.container}>
      <section aria-label="Лента заказов">
        <div className={`${feedConstructorStyles.feed}`}>
        <OrdersList orders={orders} to={'feed'} />
        </div>
      </section>
      <section className={feedConstructorStyles.stats}>
        <div className={`${feedConstructorStyles['orders-board']} mb-15`}>
          <section className={feedConstructorStyles.done}>
            <OrdersNumbersList title={'Готовы:'} orders={doneOrdersNumbers}/>
          </section>
          <section className={feedConstructorStyles['in-work']}>
            <OrdersNumbersList title={'В работе:'} orders={inWorkOrdersNumbers}/>
          </section>
        </div>

        <section className="mb-15">
          <TotalOrders title={'Выполнено за все время:'} totalOrders={total} />
        </section>

        <section className={feedConstructorStyles.today}>
          <TotalOrders title={'Выполнено за сегодня:'} totalOrders={totalToday} />
        </section>
      </section>
    </div>
  )
}