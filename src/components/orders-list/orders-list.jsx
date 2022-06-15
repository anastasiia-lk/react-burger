// import React from 'react';
import { useLocation, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import OrderCard from '../order-card/order-card';

// import ordersListStyles from './orders-list.module.css';
// import { orderPropType } from '../../utils/propTypes';

export default function OrdersList() {
  const location = useLocation();

  return (
    <ul className="list">
      {[1,2].map((order) => (
          <li>
            {/* <Link
              to={`/${to}/${order._id}`}
              state={{ background: location }}
              className={ordersListStyles.link}
            > */}
              <OrderCard />
            {/* </Link> */}
          </li>
        ))}
    </ul>
  );
}