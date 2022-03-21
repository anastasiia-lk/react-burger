import orderDetailsStyles from './order-details.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
function OrderDetails (props) {
  function openModalOverlay() {

  }

  function closeModalOverlay() {

  }

  return (
    <div className={`${orderDetailsStyles.container} mt-15`}>
      <div className='text text_type_digits-large'>
        {props.order}
      </div>
      <h2 className='text text_type_main-medium mt-8'>идентификатор заказа</h2>
      <div className={`${orderDetailsStyles[`order-confirmed`]} mt-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyles['ready-message']} text text_type_main-default mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default  OrderDetails;