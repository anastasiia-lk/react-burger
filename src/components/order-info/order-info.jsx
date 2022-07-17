import orderInfoStyles from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { getOrders, getUserOrders } from '../../services/selectors/ws';
import { wsCloseAction, wsConnectionStartAction } from '../../services/actions/wsActions';
import { wsAuthCloseAction, wsAuthConnectionStartAction } from '../../services/actions/wsAuthActions';
import { useEffect, useMemo } from 'react';
import { loadingMessage } from '../../utils/data';
import {formatOrderNumber, getOrderStatus, getTimeStampString} from '../../utils/utils';
import OrderInfoItem from '../order-info-item/order-info-item';

export default function OrderInfo() {
const dispatch = useDispatch();
const { id } = useParams();
const match = useMatch(`/feed/${id}`);
const selector = match ? getOrders : getUserOrders;
const { orders } = useSelector(selector);
const { ingredients } = useSelector(store => store.constructor);

useEffect(() => {
  if (match) {
    dispatch(wsConnectionStartAction());
  } else {
    dispatch(wsAuthConnectionStartAction());
  }

  return () => {
    if (match) {
      dispatch(wsCloseAction());
    } else {
      dispatch(wsAuthCloseAction());
    }
  };
}, [dispatch, match]);

if (!orders) return (
     <div>{loadingMessage}</div>
  );

const order = orders.find((order) => order._id === id);
const { name, number, status, ingredients: ingredIds, createdAt } = order;
  const orderNumber = `#${number.toString().padStart(6, '0')}`;
  const orderStatus = getOrderStatus(status);

  const orderIngredients = ingredIds.reduce((acc, current) => {
    const ingredient = ingredients.find((item) => item._id === current);
    if (!acc[current]) {
      ingredient.type === 'bun'
        ? acc[current] = { ...ingredient, count: 2 }
        : acc[current] = { ...ingredient, count: 1 };
    } else {
      ingredient.type === 'bun'
        ? acc[current].count = 2
        : acc[current].count++;
    }

    return acc;
  }, {});

  const ingredientsList = Object.values(orderIngredients);
  console.log('ingredientsList', orderIngredients)
  const totalPrice = ingredientsList.reduce(
    (acc, ingredient) => acc + ingredient.price * ingredient.count,
    0
  );
  const orderTime = getTimeStampString(createdAt);
return (
  <div className={`${orderInfoStyles.container} pt-5`}>
      <p
        className={`${orderInfoStyles['order-number']}
          text
          text_type_digits-default
          mb-10`
        }
      >
        {orderNumber}
      </p>
      <h2 className='text text_type_main-medium mb-3'>{name}</h2>
      <p className='text text_type_main-default mb-15 '>
      {orderStatus}
      </p>
      <h3 className='text text_type_main-default mb-6'>Состав:</h3>
      <div className="mb-10">
        <ul
          className={`${orderInfoStyles['ingredients-list']} list custom-scroll`}
        >
          {ingredientsList.map((item, index) => (
            <li key={index} className={`${orderInfoStyles['ingredient']} mr-6`}>
              <OrderInfoItem ingredient={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className={`${orderInfoStyles['time-price']}`}>
        <p
          className='text text_type_main-default text_color_inactive'
        >
          {orderTime}
        </p>
        <div className={`${orderInfoStyles['price']}`}>
          <span className='text text_type_digits-default mr-2'>
          {totalPrice}
          </span>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}