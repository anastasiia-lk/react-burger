import orderDetailsStyles from './order-details.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import {loadingMessage} from '../../utils/data';
import { useAppSelector } from '../../services/hooks';

import { FC } from 'react';

const OrderDetails: FC = () => {
  const { order, request, failed, isEmpty } = useAppSelector(store => store.order);
  let orderNumber;
  if (order) {
    orderNumber = order.number;
  }
  return (
    <div className={`${orderDetailsStyles.container} mt-15`}>
       {failed && (
        <p className='text text_type_main-default'>
          Сервер не отвечает
        </p>
      )}
      {request && loadingMessage}
      {!request && !failed && !isEmpty && (
        <>
      <div className='text text_type_digits-large'>
        {orderNumber}
      </div>
      <h2 className='text text_type_main-medium mt-8'>идентификатор заказа</h2>
      <div className={`${orderDetailsStyles[`order-confirmed`]} mt-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyles['ready-message']} text text_type_main-default mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </>)}
    </div>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.number
}

export default  OrderDetails;
