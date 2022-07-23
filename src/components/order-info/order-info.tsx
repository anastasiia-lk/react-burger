import orderInfoStyles from './order-info.module.css';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams } from 'react-router-dom';
import { getOrders, getUserOrders } from '../../services/selectors/ws';
import { wsCloseAction, wsConnectionStartAction } from '../../services/actions/wsActions';
import { wsAuthCloseAction, wsAuthConnectionStartAction } from '../../services/actions/wsAuthActions';
import { useEffect, useMemo, FC } from 'react';
import { loadingMessage } from '../../utils/data';
import { getOrderStatus, getTimeStampString} from '../../utils/utils';
import OrderInfoItem from '../order-info-item/order-info-item';
import { IIngredientWithCount, IOrderInfoProps } from './order-info.types';
import { IIngredient, IOrder } from '../../services/types/data';

const OrderInfo: FC<IOrderInfoProps> = ({ isModal = false }) => {
const dispatch = useDispatch();
const { id } = useParams();
const match = useMatch(`/feed/${id}`);
const selector = match ? getOrders : getUserOrders;
const { orders } = useAppSelector(selector);
const { ingredients } = useAppSelector(store => store.constructor);

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

const order: IOrder = orders.find((order: IOrder) => order._id === id)!;
const { name, number, status, ingredients: ingredIds, createdAt } = order;
  const orderNumber = `#${number.toString().padStart(6, '0')}`;
  const orderStatus = getOrderStatus(status);

  const orderIngredients = ingredIds.reduce<{[k: string]: IIngredientWithCount}>((acc, current) => {
    const ingredient: IIngredient = ingredients.find((item) => item._id === current)!;
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
        className={`${!isModal && orderInfoStyles['order-number']}
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
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo