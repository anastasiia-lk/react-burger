import orderInfoStyles from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderInfo() {
return (
  <div className={`${orderInfoStyles.container} pt-5`}>
      <p
        className={`${orderInfoStyles['order-number']}
          text
          text_type_digits-default
          mb-10`
        }
      >
        1234567
      </p>
      <h2 className='text text_type_main-medium mb-3'>Black Hole Singularity острый бургер</h2>
      <p className='text text_type_main-default mb-15'>
      Выполнен
      </p>
      <h3 className='text text_type_main-default mb-6'>Состав:</h3>
      <div className="mb-10">
        <ul
          className={`${orderInfoStyles['ingredients-list']} list custom-scroll`}
        >
          {[1,2].map((item, index) => (
            <li key={index} className={`${orderInfoStyles['ingredient']} mr-6`}>
              {/* <OrderInfoItem ingredient={item} /> */}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${orderInfoStyles['time-price']}`}>
        <p
          className='text text_type_main-default text_color_inactive'
        >
          Вчера, 13:50 i-GMT+3
        </p>
        <div className={`${orderInfoStyles['price']}`}>
          <span className='text text_type_digits-default mr-2'>
            510
          </span>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}