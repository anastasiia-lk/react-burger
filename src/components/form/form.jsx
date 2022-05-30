import form from './form.module.css';
import {CheckMarkIcon, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Form ({config}) {
  return (
    <div className={`${form.container}`}>
      <h1 className="text text_type_main-medium mb-6">{config.header}</h1>
      {config.inputsArr.map((input) => 
        <div className ='mb-6'>
          <Input 
            type = {`${input.type}`}
            placeholder = {`${input.placeholder}`}
            icon = {`${input.icon}`}
            name = {`${input.name}`}
          />
        </div>
      )}
      <div className='mb-20'>
        <Button type="primary" size="large">
        {config.buttonText}
        </Button>
      </div>
      {config.subtitleArr.map((subtitle) => 
        <div className={`${form[`subtitle-container`]}`}>
          <p className='mr-2'>{subtitle.text}</p>
          <Link to="/register">{subtitle.linkText}</Link>
        </div>
      )}
    </div>
  )
}

// OrderDetails.propTypes = {
//   order: PropTypes.number
// }

export default  Form;
