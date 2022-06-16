import orderCardStyles from './order-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { formatOrderNumber, getTimeStampString, getOrderStatus } from '../../utils/utils';
import React, { useMemo } from 'react';
import IngredientImg from '../ingredient-image/ingredient-image'

export default function OrderCard({ order, isUser }) {
  const { ingredients } = useSelector(store => store.constructor);
  const { name, number, ingredients: ingredIds, createdAt, status } = order;
  const orderStatus = getOrderStatus(status);

  const orderNumber = useMemo(() => {
    return `#${formatOrderNumber(number)}`;
  }, [number]);

  const { imageUrls, totalPrice } = useMemo(() => {
    const urls = [];
    let price = 0;

    ingredIds.forEach((id) => {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) {
        if (urls.length < 6) {
          urls.push(ingredient.image_mobile);
        }

        if (ingredient.type === 'bun') {
          price += ingredient.price * 2;
        } else {
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
    <div className={orderCardStyles.container}>
      <div className={orderCardStyles.credentials}>
        <span className='text text_type_digits-default'>{orderNumber}</span>
        <span className='text text_type_main-default text_color_inactive'>{orderTime}</span>
      </div>
      <p className='text text_type_main-medium'>{name}</p>
      {isUser && (
        <p
          className='text text_type_main-default mb-6'
        >
          {orderStatus}
        </p>
      )}
      <div className={orderCardStyles.info}>
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
      </div>
      <div className={orderCardStyles.price}>
          <span className='text text_type_digits-default'>
            {totalPrice}
          </span>
          <CurrencyIcon />
        </div>
    </div>
  )
}