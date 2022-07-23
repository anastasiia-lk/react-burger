import orderCardStyles from './order-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getTimeStampString, getOrderStatus } from '../../utils/utils';
import React, { useMemo, FC } from 'react';
import IngredientImg from '../ingredient-image/ingredient-image'
import {IOrderCard} from '../../services/types/data'
import {useAppSelector} from '../../services/hooks'

const OrderCard: FC<IOrderCard> = ({ order, isUser }) => {
  const { ingredients } = useAppSelector(store => store.constructor);
  const { name, number, ingredients: ingredIds, createdAt, status } = order;
  const orderStatus = getOrderStatus(status);

  const orderNumber = useMemo(() => {
    return `#${number.toString().padStart(6, '0')}`;
  }, [number]);

  const { imageUrls, totalPrice } = useMemo(() => {
    const urls: string[] = [];
    let price = 0;

    let uniqueIngredIds = ingredIds.filter((x, i, a) => a.indexOf(x) === i)
    uniqueIngredIds.forEach((id) => {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient?.type === 'bun') {
        price += ingredient.price*2;
      }
    })

    ingredIds.forEach((id) => {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) {
        if (urls.length < 6) {
          urls.push(ingredient.image_mobile);
        }

        if (ingredient.type !== 'bun') {
          price += ingredient.price;
        }
      }
    });

    return {
      imageUrls: urls,
      totalPrice: price,
    };
  }, [ingredients, ingredIds]);

  const count = useMemo(() => {
    return ingredIds.length - 6;
  }, [ingredIds.length]);

  const orderTime = getTimeStampString(createdAt);

  return (
    <div className={`${orderCardStyles.container} mr-2`}>
      <div className={`${orderCardStyles.credentials} pl-6 pr-6`}>
        <span className='text text_type_digits-default mt-6'>{orderNumber}</span>
        <span className='text text_type_main-default text_color_inactive mt-6'>{orderTime}</span>
      </div>
      <p className='text text_type_main-medium pl-6 pr-6'>{name}</p>
      {isUser && (
        <p
          className='text text_type_main-default mb-6 pl-6 pr-6'
        >
          {orderStatus}
        </p>
      )}
      <div className={`${orderCardStyles.info} mb-6`}>
        <ul className="list">
          {
            imageUrls.map((url, index) => {
              return (
                <li key={index} className={orderCardStyles.orderContainer}>
                   <IngredientImg imageUrl={url} index={index} count={count} />
                </li>
              ) 
            })
          }
        </ul>
      <div className={`${orderCardStyles.price} pr-6`}>
          <span className='text text_type_digits-default'>
            {totalPrice}
          </span>
          <CurrencyIcon type='primary' />
      </div>
    </div>
    </div>
  )
}

export default OrderCard;
