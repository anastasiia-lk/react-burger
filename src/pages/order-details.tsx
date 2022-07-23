import OrderInfo from '../components/order-info/order-info';

import orderDetailsStyle from './order-details.module.css';
import React, { FC } from 'react';

export const OrderInfoPage: FC = () => {
  return (
    <div className={`${orderDetailsStyle.container} mt-25`}>
      <OrderInfo />
    </div>
  );
}