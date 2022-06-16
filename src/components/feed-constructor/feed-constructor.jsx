import feedConstructorStyles from './feed-constructor.module.css';
import {Link, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import OrderCard from '../order-card/order-card';
import React, { useEffect, useMemo } from 'react';
import { wsClose, wsConnectionStart } from '../../services/actions/wsActions';
import { loadingMessage } from '../../utils/data';
import { formatOrderNumber } from '../../utils/utils';

export default function FeedConstructor() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(store => store.ws.orders);
  const location = useLocation();

  useEffect(() => {
    dispatch(wsConnectionStart());

    return () => {
      dispatch(wsClose());
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
      <section aria-label="Лента заказов"
        className={`${feedConstructorStyles.feed} custom-scroll`}>
          <ul className="list">
            {orders.map((order) => {
              return(
                <li className={feedConstructorStyles.orderContainer} key={order._id}>
                  <Link
                  to={`/feed/${order._id}`}
                  state={{ background: location }}
                  className={feedConstructorStyles.link}
                  >
                    <OrderCard order={order} />
                  </Link>
                </li>
              )
            })}
          </ul>
      </section>
      <section className={feedConstructorStyles.stats}>
      <div className={`${feedConstructorStyles['orders-board']} mb-15`}>
          <section className={feedConstructorStyles.done}>
            <h2 className={'text text_type_main-medium mb-6'}>
              Готовы:
            </h2>
            <ul className={`${feedConstructorStyles['number-list']} list`}>
            {doneOrdersNumbers &&
                doneOrdersNumbers.map((item, index) => (
                  <li
                    className={`
                      ${feedConstructorStyles.number}
                      ${feedConstructorStyles['number_type_success']}
                      text 
                      text_type_digits-default
                      mb-2`
                    }
                  >
                    {formatOrderNumber(item)}
                  </li>
                ))}
            </ul>
          </section>

          <section className={feedConstructorStyles['in-work']}>
            <h2 className='text text_type_main-medium mb-6'>
              В работе:
            </h2>
            <ul className="list">
            {inWorkOrdersNumbers &&
                inWorkOrdersNumbers.map((item) => (
                  <li
                    className={`
                      ${feedConstructorStyles.number}
                      text 
                      text_type_digits-default
                      mb-2`
                    }
                  >
                    {formatOrderNumber(item)}
                  </li>
                ))}
            </ul>
          </section>
        </div>

        <section className="mb-15">
          <h2 className='text text_type_main-medium'>
            Выполнено за все время:
          </h2>
          <span
            className={`${feedConstructorStyles.number} text text_type_digits-large`}
          >
            {total.toLocaleString()}
          </span>
        </section>

        <section className={feedConstructorStyles.today}>
          <h2 className='text text_type_main-medium'>
            Выполнено за сегодня:
          </h2>
          <span
            className={`${feedConstructorStyles.count} text text_type_digits-large`}
          >
             {totalToday.toLocaleString()}
          </span>
        </section>
      </section>
    </div>
  )
}