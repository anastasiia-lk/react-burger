
import OrdersList from '../orders-list/orders-list';


import ordersHistory from './orders-history.module.css';

export default function OrdersHistory() {


  return (
    <div className={`${ordersHistory.container} custom-scroll`}>
      <OrdersList to="profile/orders" />
    </div>
  );
}