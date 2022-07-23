import React, {FC} from 'react';

import OrdersHistory from '../components/orders-history/orders-history';

export const ProfileOrdersHistory: FC = () => {
  return (
    <div className='pr-5'>
      <OrdersHistory />
    </div>
  )
}