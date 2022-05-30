import form from './form.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Form ({order}) {
  return (
    <div className={`${form.container}`}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <div className='text text_type_digits-large'>
        {order}
      </div>
      <h2 className='text text_type_main-medium mt-8'>идентификатор заказа</h2>
      <div className={`${form[`order-confirmed`]} mt-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <p className={`${form['ready-message']} text text_type_main-default mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }

export default  Form;
