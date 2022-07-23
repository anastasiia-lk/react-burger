import OrderInfo from '../components/order-info/order-info';

import orderDetailsStyle from './order-details.module.css';

export function OrderInfoPage() {
  return (
    <div className={`${orderDetailsStyle.container} mt-25`}>
      <OrderInfo />
    </div>
  );
}