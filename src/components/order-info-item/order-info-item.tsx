import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientImg from '../ingredient-image/ingredient-image';

import orderInfoItemStyles from './order-info-item.module.css';

import { FC } from 'react';

import { IOrderInfoItem } from './order-info-item.types';


const OrderInfoItem: FC<IOrderInfoItem> = ({ ingredient }) => {
  const { name, image_mobile: imageUrl, price, count } = ingredient;

  return (
    <>
      <div className="mr-4">
        <IngredientImg
          imageUrl={imageUrl}
          position="relative"
        />
      </div>
      <p className='text text_type_main-default mr-4'>
        {name}
      </p>
      <div className={orderInfoItemStyles.currency}>
        <p className='text text_type_digits-default mr-4'>
          {`${count} x ${price}`}
        </p>
        <CurrencyIcon type='primary' />
      </div>
    </>
  );
}

export default OrderInfoItem;