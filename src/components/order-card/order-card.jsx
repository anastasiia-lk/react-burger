import orderCardStyles from './order-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderCard({ order }) {
  return (
    <div className={orderCardStyles.container}>
      <div className={orderCardStyles.credentials}>
        <span className='text text_type_digits-default'>#034535</span>
        <span className='text text_type_main-default text_color_inactive'>Сегодня, 16:20 i-GMT+3</span>
      </div>
      <p className='text text_type_main-medium'>Death Star Starship Main бургер</p>
      <div className={orderCardStyles.info}>
        <ul className="list">
          {
            [1,2].map((image) => {
              return (
                <li className={orderCardStyles.orderContainer}>
                  {/* <IngredientIcon /> */}
                </li>
              ) 
            })
          }
        </ul>
      </div>
      <div className={orderCardStyles.price}>
          <span className='text text_type_digits-default'>
            0
          </span>
          <CurrencyIcon />
        </div>
    </div>
  )
}