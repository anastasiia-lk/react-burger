import { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import OrderCard from '../order-card/order-card';

import ordersListStyles from './orders-list.module.css';
// import { orderPropType } from '../../utils/propTypes';
import { IOrdersListProps } from './orders-list.types';

const OrdersList: FC<IOrdersListProps> = ({ orders, to, isUser = false }) => {
  const location = useLocation();

  return (
    <ul className={`${ordersListStyles.link} list`}>
      {orders.map((order) => (
          <li key={order._id} className={ordersListStyles.link}>
            <Link
              to={`/${to}/${order._id}`}
              state={{ background: location }}
              className={ordersListStyles.link}
            >
             <OrderCard order={order} isUser={isUser}/>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default OrdersList;